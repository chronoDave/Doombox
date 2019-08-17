const { StringDecoder } = require('string_decoder');
const { app } = require('electron');
const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

// Controllers
const nebdController = require('../../modules/system/controllers/nebdController');

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
 * Decode string from buffer
 *
 * $00 – ISO-8859-1 (LATIN-1, Identical to ASCII for values smaller than 0x80).
 *
 * $01 – UCS-2 encoded Unicode with BOM, in ID3v2.2 and ID3v2.3.
 *
 * $02 – UTF-16BE encoded Unicode without BOM, in ID3v2.4.
 *
 * $03 – UTF-8 encoded Unicode, in ID3v2.4.
 *
 * $04 - BASE-64
 *
 * $05 - HEX
 */
const decodeString = (format, string) => {
  const ID3_ENCODINGS = ['ascii', 'ucs2', 'utf16le', 'utf8', 'base64', 'hex'];
  return new StringDecoder(ID3_ENCODINGS[format]).write(string);
};

/**
 * Removes BOM and 0 padding
 */
const cleanString = string => {
  if (typeof string !== 'string') return string;
  return string.replace(/\uFEFF/g, '').replace(/\u0000/g, '');
};

const createImage = (image, id) => new Promise(resolve => {
  const {
    imageFormat: format,
    imageData: buffer,
    ...rest
  } = image;
  const dir = path.resolve(`${app.getPath('userData')}/images`);
  const _id = id.replace(/:/g, '_');

  mkdirp(dir, err => {
    if (err) resolve(null);

    const extension = format.match(/(png|jpeg|jpg|gif)/);
    if (extension) {
      const file = path.resolve(`${dir}/${_id}.${extension[0]}`);

      fs.writeFile(file, buffer, async writeErr => {
        if (writeErr) resolve(null);

        await nebdController.create(
          'images',
          {
            _id,
            format,
            file,
            ...rest
          },
          false
        );

        resolve(_id);
      });
    } else {
      resolve(null);
    }
  });
});

module.exports = {
  synchToInt,
  decodeString,
  cleanString,
  createImage
};
