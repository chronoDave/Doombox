const crypto = require('crypto');

const capitalize = string => `${string[0].toUpperCase()}${string.slice(1)}`;
const clamp = (min, max, n) => Math.min(Math.max(n, min), max);
const generateUid = (seed = crypto.randomBytes(20)) => crypto
  .createHash('md5')
  .update(seed)
  .digest('hex');
const getCumulative = (array, initialValue = 0) => {
  const cumulative = [initialValue];

  for (let i = 0; i < array.length; i += 1) {
    cumulative.push(array[i] + cumulative[i]);
  }

  return cumulative;
};
const getLevenshteinDistance = (a, b) => {
  const matrix = [];

  // Always check long => short
  const l1 = Math.max(a.length, b.length);
  const l2 = Math.min(a.length, b.length);

  // Fill matrix
  for (let i = 0; i <= l1; i += 1) {
    matrix[i] = [];

    for (let j = 0; j <= l2; j += 1) {
      matrix[i][j] = 0;
    }
  }

  // Insert prefixes
  for (let i = 1; i <= l1; i += 1) matrix[i][0] = i;
  for (let i = 1; i <= l2; i += 1) matrix[0][i] = i;

  // Find distance
  for (let j = 1; j <= l2; j += 1) {
    for (let i = 1; i <= l1; i += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1; // Check if letters are equal

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[l1][l2];
};
const localizeTag = (metadata, tag, useLocalizedMetadata) => (useLocalizedMetadata ?
  (metadata[`${tag}localized`] || metadata[tag] || '').toLowerCase() :
  (metadata[tag] || '').toLowerCase());
const pascalize = (string, separator = ' ') => string
  .split(separator)
  .map(capitalize)
  .join(separator);
const shuffle = array => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = shuffled[j];
      shuffled[j] = shuffled[i];
      shuffled[i] = swap;
    }
    if (
      shuffled.length <= 1 ||
      shuffled.some((v, i) => v !== array[i])
    ) return shuffled;
  }
};
const sortMetadata = (tags, useLocalizedMetadata) => (a, b) => {
  const normalizeValue = (metadata, tag) => {
    const value = metadata[tag];

    if (typeof value === 'number') return value;
    if (Array.isArray(value)) return value[0]; // disc, track
    return useLocalizedMetadata ?
      (metadata[`${tag}localized`] || value || '').toLowerCase() :
      (value || '').toLowerCase();
  };

  for (let i = 0; i < tags.length; i += 1) {
    const aTag = normalizeValue(a, tags[i]);
    const bTag = normalizeValue(b, tags[i]);

    if (aTag > bTag) return 1;
    if (aTag < bTag) return -1;
  }

  return 0;
};
const toArray = x => (Array.isArray(x) ? x : [x]);
const cx = (...args) => args
  .filter(x => typeof x === 'string' && x.length > 0)
  .join(' ');

module.exports = {
  cx,
  capitalize,
  clamp,
  generateUid,
  getCumulative,
  getLevenshteinDistance,
  localizeTag,
  pascalize,
  shuffle,
  sortMetadata,
  toArray
};
