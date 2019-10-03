const { StringDecoder } = require('string_decoder');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

/**
 * Decode synchsafe integer
 * - Input: 4 bytes, 32 bits, with 0 left-padding
 * `01111111 01111111 01111111 01111111`
 * - Output: 4 bytes, 32 bits, with padding removed
 * `00001111 11111111 11111111 11111111`
 */

const synchToInt = synch => {
  const mask = 0b01111111;
  const byte_1 = synch & mask;
  const byte_2 = (synch >> 8) & mask;
  const byte_3 = (synch >> 16) & mask;
  const byte_4 = (synch >> 24) & mask;

  return byte_1 | (byte_2 << 7) | (byte_3 << 14) | (byte_4 << 21);
};

/**
 * Decode string from buffer
 * - $00 – ISO-8859-1 (LATIN-1, Identical to ASCII for values smaller than 0x80).
 * - $01 – UCS-2 encoded Unicode with BOM, in ID3v2.2 and ID3v2.3.
 * - $02 – UTF-16BE encoded Unicode without BOM, in ID3v2.4.
 * - $03 – UTF-8 encoded Unicode, in ID3v2.4.
 * - $04 - BASE-64
 * - $05 - HEX
 * @param {number} index - Encoding index
 * @param {Buffer} buffer - String buffer
 */
const readStringFromBuffer = (index, buffer) => {
  const encoding = ['ascii', 'ucs2', 'utf16le', 'utf8', 'base64', 'hex'];
  return new StringDecoder(encoding[index]).write(buffer);
};

/**
 * Get length from DataView
 * Only checks for null termination, should only be used when string location is known
 * @param {DataView} view - String buffer
 * @param {number=} offset - Optional offset, default 0
 */
const stringLengthFromView = (view, offset = 0) => {
  let size = 0;
  while (view.getUint8(size + offset) !== 0) size += 1;
  return size;
};

/**
 * Removes BOM and 0 padding
 */
const removeZeroPadding = string => {
  if (typeof string !== 'string') return string;
  return string
    .replace(/\uFEFF/g, '')
    .replace(/\u0000/g, '');
};

/**
 * Write image buffer to file
 */
const writeImage = props => {
  const {
    _id,
    db,
    image: {
      mimeType,
      pictureType,
      description,
      pictureData,
    },
    config: {
      imagePath
    }
  } = props;

  mkdirp(imagePath, err => {
    if (err) throw err;

    const imageId = _id.replace(/\/|\\|\*|\?|"|:|<|>|\|/g, '_');
    const extension = mimeType.match(/(png|jpeg|jpg|gif)/i);
    const file = path.resolve(
      `${imagePath}/${imageId}.${extension ? extension[0] : 'jpg'}`
    );

    // Check if file exists
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, pictureData);

      db.create('images', {
        _id,
        path: file,
        pictureType,
        description
      });
    }
  });
};

module.exports = {
  synchToInt,
  readStringFromBuffer,
  stringLengthFromView,
  removeZeroPadding,
  writeImage
};
