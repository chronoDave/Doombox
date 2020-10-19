const parser = require('music-metadata');

const { toArray, createId } = require('@doombox-utils');

/**
 * Parse file
 * @param {string} file - Absolute path to file
 * @param {object} options
 * @param {boolean} options.skipCovers - Should covers be skipped (default `false`)
 * @param {array} options.requiredMetadata - Required metadata tags (default `[]`)
 */
const parseMetadata = async (file, { skipCovers = false, requiredMetadata = [] } = {}) => {
  const {
    format,
    native,
    common: { picture, ...tags }
  } = await parser.parseFile(file, { skipCovers });

  // Validation
  if (format.tagTypes.length === 0) {
    return Promise.reject(new Error(`Corrupted file: ${file}`));
  }
  if (
    Array.isArray(requiredMetadata) &&
    requiredMetadata.length > 0 &&
    !Object.keys(tags).some(key => requiredMetadata.includes(key))
  ) {
    return Promise.reject(new Error(`Missing metadata: '${requiredMetadata}', ${file}`));
  }

  // Get native tags
  const formatType = format.tagTypes.sort().pop();
  const nativeTags = native[formatType]
    .reduce((acc, { id, value }) => ({
      ...acc,
      [id.toUpperCase()]: value
    }), {});
  const cdid = (() => {
    const tag = toArray(
      tags.catalognumber ||
      nativeTags['TXXX:CATALOGID'] ||
      nativeTags['TXXX:CDID']
    )
      .filter(v => v);

    if (tag.length > 0) return tag;
    return null;
  })();

  // Get images
  const images = picture ?
    picture.map(image => ({
      _id: createId(`${tags.albumartist || ''}${tags.album || ''}`),
      ...image,
      format: image.format.split('/').pop() // image/jpg => jpg
    })) :
    [];

  return Promise.resolve({
    file,
    images,
    format,
    _albumId: createId(`${tags.albumartist || 'Unknown'}${tags.album}` || 'Unknown'),
    _labelId: createId(tags.albumartist || 'Unknown'),
    metadata: {
      albumartist: nativeTags.TP2 || null,
      titlelocalized: nativeTags['TXXX:TITLELOCALIZED'] || null,
      artistlocalized: nativeTags['TXXX:ARTISTLOCALIZED'] || null,
      albumlocalized: nativeTags['TXXX:ALBUMLOCALIZED'] || null,
      albumartistlocalized: nativeTags['TXXX:ALBUMARTISTLOCALIZED'] || null,
      cdid,
      date: nativeTags.TDAT || null,
      event: nativeTags['TXXX:EVENT'] || null,
      ...tags
    }
  });
};

module.exports = {
  parseMetadata
};
