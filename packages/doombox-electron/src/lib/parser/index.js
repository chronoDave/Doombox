const fs = require('fs');

// Types
const {
  createType,
  LIBRARY,
  CREATE,
  ERROR,
  SUCCESS,
  SCAN
} = require('@doombox/utils/types');

// Utils
const {
  synchToInt,
  cleanString,
  createImageFile
} = require('./utils');

// Decoders
const {
  decodeFrame
} = require('./decode');

const parseID3 = ({ file, db, config }) => new Promise((resolve, reject) => (
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
    let image = null;

    while (offset < ID3_SIZE) {
      const frame = decodeFrame(buffer, offset, HEADER_SIZE);
      if (!frame) break;

      if (frame.id === 'APIC' && config.parseImage) {
        image = frame.value;
      } else {
        payload = { ...payload, [frame.id]: cleanString(frame.value) };
      }

      offset += frame.size;
    }

    if (image) {
      const imageId = `${payload.TPE2}-${payload.TALB}`.replace(/:|\||\*|\/|\?|"/g, '_');
      image = await createImageFile({
        config,
        db,
        image,
        _id: imageId
      });
    }

    return resolve({
      _id: file,
      path: file,
      ...payload,
      APIC: image
    });
  })
));

const parseRecursive = (props, iteration = 0) => {
  const {
    event,
    files,
    db,
    config
  } = props;

  if (!Array.isArray(files)) {
    return event.sender.send(
      createType([ERROR, CREATE, LIBRARY]),
      new Error('Files is not an array')
    );
  }

  const batches = Math.ceil(files.length / config.batchSize);
  const offset = config.batchSize * iteration;

  return Promise.all(files
    .slice(offset, offset + config.batchSize)
    .map(file => parseID3({
      file,
      db,
      config
    })))
    .then(async data => {
      if (iteration < batches) {
        event.sender.send(SCAN, { current: iteration + 1, total: batches });

        await db.create('library', data);

        parseRecursive({
          event,
          files,
          db,
          config
        }, iteration + 1);
      } else {
        const payload = await db.read({ collection: 'library' });
        event.sender.send(createType([SUCCESS, CREATE, LIBRARY]), payload);
      }
    })
    .catch(err => {
      event.sender.send(createType([ERROR, CREATE, LIBRARY]), err);
    });
};

module.exports = {
  parseID3,
  parseRecursive
};
