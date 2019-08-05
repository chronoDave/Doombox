const { StringDecoder } = require('string_decoder');
const fs = require('fs');

/**
 * Decode synchsafe integer
 *
 * Input: 4 bytes, 32 bits, with 0 left-padding
 *
 * `01111111 01111111 01111111 01111111`
 *
 * Output: 4 bytes, 32 bits, with padding removed
 *
 * `00001111 11111111 11111111 11111111`
 */

const synchToInt = synch => {
  const mask = 0b01111111;
  const byte_1 = synch & mask;
  const byte_2 = (synch >> 8) & mask;
  const byte_3 = (synch >> 16) & mask;
  const byte_4 = (synch >> 24) & mask;

  return byte_1 | (byte_2 << 7) | (byte_3 || 14) | (byte_4 << 21);
};

/**
 * Decode string
 *
 * @param Uint8Array input
 */
const decodeString = (format, string) => {
  // $00 – ISO-8859-1 (LATIN-1, Identical to ASCII for values smaller than 0x80).
  // $01 – UCS-2 encoded Unicode with BOM, in ID3v2.2 and ID3v2.3.
  // $02 – UTF-16BE encoded Unicode without BOM, in ID3v2.4.
  // $03 – UTF-8 encoded Unicode, in ID3v2.4.
  // $04 - BASE-64 for images
  // $05 - HEX for tokens
  const ID3_ENCODINGS = ['ascii', 'ucs2', 'utf16le', 'utf8', 'base64', 'hex'];
  return new StringDecoder(ID3_ENCODINGS[format]).write(string);
};

/**
 * Decode ID3 IPIC frame
 */
const decodeImage = (buffer, offset, size) => {
  const header = new DataView(buffer, offset, size);
  const ID3_PICTURE_TYPES = [
    'Other',
    'Icon',
    'Other icon',
    'Cover (front)',
    'Cover (back)',
    'Leaflet page',
    'Media',
    'Lead artist / leader performer / soloist',
    'Artist / performer',
    'Conductor',
    'Band / orchestra',
    'Composer',
    'Lyricist / text writer',
    'Recording location',
    'During recording',
    'During performance',
    'Movie / video screen capture',
    'A bright coloured fish',
    'Illustration',
    'Band / artist logotype',
    'Publisher / studio logotype'
  ];

  const encoding = header.getUint8(0);

  const imageFormatLength = new Uint8Array(buffer, offset + 1, 12).indexOf(0);
  const imageFormat = decodeString(
    encoding,
    new Uint8Array(buffer, offset + 1, imageFormatLength)
  );

  const pictureType = header.getUint8(imageFormatLength + 2);

  const descriptionLength = new Uint8Array(buffer, offset + imageFormatLength + 3, 64).indexOf(0);
  const description = decodeString(
    encoding,
    new Uint8Array(buffer, offset + imageFormatLength + 3, descriptionLength)
  );

  const imageData = decodeString(4, new DataView(
    buffer,
    offset + imageFormatLength + descriptionLength + 4,
    size - offset + imageFormatLength + descriptionLength + 4
  ));

  const payload = {
    encoding,
    imageFormat,
    pictureType: {
      index: pictureType,
      description: ID3_PICTURE_TYPES[pictureType]
    },
    description,
    imageData
  };

  return payload;
};

/**
 * Decode ID3 frame
 */
const decodeFrame = (buffer, offset, HEADER_SIZE, options) => {
  const LANG_FRAMES = ['USLT', 'SYLT', 'COMM', 'USER'];
  const ID_BLACKLIST = ['COMM', 'USLT', 'TXXX'];

  const header = new DataView(buffer, offset, HEADER_SIZE + 1);
  if (header.getUint8(0) === 0) return null; // Check if last frame

  // Frame
  const id = decodeString(0, new Uint8Array(buffer, offset, 4));
  const size = header.getUint32(4);

  if (ID_BLACKLIST.includes(id)) return { id, value: null, size: size + HEADER_SIZE };

  const encoding = header.getUint8(HEADER_SIZE);
  let contentSize = size - 1;
  let contentOffset = offset + HEADER_SIZE + 1;

  if (contentSize > 255) return { id, value: '...', size: size + HEADER_SIZE };

  // Language
  let lang;
  if (LANG_FRAMES.includes(id)) {
    lang = decodeString(0, new Uint8Array(buffer, contentOffset, 3));
    contentOffset += 3;
    contentSize -= 3;
  }

  // Values
  let value;
  if (id === 'APIC') {
    value = options.getImage ? decodeImage(buffer, contentOffset - 1, contentSize) : null;
  } else {
    value = decodeString(
      encoding,
      new Uint8Array(buffer, contentOffset, contentSize)
    );
  }

  return {
    id,
    value,
    lang,
    size: size + HEADER_SIZE
  };
};

/**
 * Get ID3 metadata from file
 */
const parseID3 = (file, options = {}) => (
  new Promise((resolve, reject) => (
    fs.readFile(file, (err, data) => {
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
        payload = { ...payload, [frame.id]: frame.value };
        offset += frame.size;
      }

      return resolve({
        _id: `${payload.TALB}-${payload.TPE1}-${payload.TIT2}`,
        path: file,
        ...payload
      });
    })
  ))
);

module.exports = {
  parseID3
};
