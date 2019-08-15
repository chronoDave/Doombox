const { decodeString } = require('./utils');
const {
  ID3_PICTURE_TYPES,
  ID3_LANG_FRAMES,
  ID3_FRAME_BLACKLIST
} = require('../../const/id3');

/**
 * Decode ID3 IPIC frame
 */
const decodeImage = (buffer, offset, size) => {
  const header = new DataView(buffer, offset, size);

  const encoding = header.getUint8(0);

  const imageFormatLength = new Uint8Array(buffer, offset + 1, 12).indexOf(0);
  const imageFormat = imageFormatLength > 0 ?
    decodeString(0, new Uint8Array(buffer, offset + 1, imageFormatLength)) :
    'image/jpg';

  const pictureType = header.getUint8(imageFormatLength + 2);

  const descriptionLength = new Uint8Array(buffer, offset + imageFormatLength + 3, 64).indexOf(0);
  const description = decodeString(
    encoding,
    new Uint8Array(buffer, offset + imageFormatLength + 3, descriptionLength)
  );

  const imageData = Buffer.from(
    buffer,
    offset + imageFormatLength + descriptionLength + 4,
    size - offset + imageFormatLength + descriptionLength + 4
  );

  const payload = {
    imageFormat,
    pictureType: ID3_PICTURE_TYPES[pictureType],
    description,
    imageData
  };

  return payload;
};

/**
 * Decode ID3 frame
 */
const decodeFrame = (buffer, offset, HEADER_SIZE, options) => {
  const header = new DataView(buffer, offset, HEADER_SIZE + 1);
  if (header.getUint8(0) === 0) return null; // Check if last frame

  // Frame
  const id = decodeString(0, new Uint8Array(buffer, offset, 4));
  const size = header.getUint32(4);

  if (ID3_FRAME_BLACKLIST.includes(id)) return { id, value: null, size: size + HEADER_SIZE };

  const encoding = header.getUint8(HEADER_SIZE);
  let contentSize = size - 1;
  let contentOffset = offset + HEADER_SIZE + 1;

  // Language
  let lang;
  if (ID3_LANG_FRAMES.includes(id)) {
    lang = decodeString(0, new Uint8Array(buffer, contentOffset, 3));
    contentOffset += 3;
    contentSize -= 3;
  }

  let value;
  if (id === 'APIC') {
    value = options.parseImage ? decodeImage(buffer, contentOffset - 1, contentSize) : null;
  } else if (contentSize > 2147483648) {
    value = null;
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

module.exports = {
  decodeImage,
  decodeFrame
};
