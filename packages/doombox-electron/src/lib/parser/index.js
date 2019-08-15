const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const mkdirp = require('mkdirp');

// Utils
const {
  synchToInt,
  cleanString,
  createImage
} = require('./utils');

// Decoders
const {
  decodeFrame
} = require('./decode');

const parseID3 = (file, options = {}) => new Promise((resolve, reject) => (
  fs.readFile(file, async (err, data) => {
    if (err) return reject(err);
    if (!data || !data.buffer) return reject(new Error('Unexpeted error'));

    // Header
    const HEADER_SIZE = 10; // ID3v2 metadata header

    const { buffer } = data;
    const header = new DataView(buffer, 0, HEADER_SIZE);

    const versionMajor = header.getUint8(3);
    const versionMinor = header.getUint8(4);
    const version = `ID3v2.${versionMajor}.${versionMinor}`;

    // Size
    const size = synchToInt(header.getUint32(6));

    // Frames
    let offset = HEADER_SIZE;
    const ID3_SIZE = HEADER_SIZE + size;

    let payload = { version };

    // Parse frames
    while (offset < ID3_SIZE) {
      const frame = decodeFrame(buffer, offset, HEADER_SIZE, options);
      if (!frame) break;
      payload = { ...payload, [frame.id]: cleanString(frame.value) };
      offset += frame.size;
    }

    let image = null;
    try {
      if (options.parseImage && payload.APIC) {
        image = await createImage(payload.APIC, `${payload.TPE2}-${payload.TALB}`);
      }
    } catch (errImage) {
      if (options.verbose) throw errImage;
    }

    return resolve({
      _id: `${payload.TPE2}-${payload.TALB}-${payload.TPE1}-${payload.TIT2}`,
      path: file,
      ...payload,
      APIC: image
    });
  })
));

module.exports = {
  parseID3
};
