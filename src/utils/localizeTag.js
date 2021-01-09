/**
 * Localize metadata tag
 * @param {object} metadata
 * @param {string} tag
 * @param {boolean} useLocalizedMetadata
 */
module.exports = (metadata, tag, useLocalizedMetadata) => (useLocalizedMetadata ?
  (metadata[`${tag}localized`] || metadata[tag] || '').toLowerCase() :
  (metadata[tag] || '').toLowerCase());
