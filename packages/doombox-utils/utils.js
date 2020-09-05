/** Casts to array */
const toArray = any => (Array.isArray(any) ?
  any :
  [any]
);

/** Get timestamp */
const getTimestamp = () => new Date()
  .toISOString()
  .replace(/\.|:/g, '_');

/**
 * Add zero padding
 * @param {number} n
 * @param {number} d - Padding depth (default `1`)
 */
const zPad = (n, d = 1) => {
  for (let i = 0; i < d; i += 1) {
    if (n < (10 ** (i + 1))) {
      return `${'0'.repeat(d - i)}${d}`;
    }
  }
  return n;
};

/**
 * Clamp `n` between `min` and `max`
 * @param {number} min
 * @param {number} max
 * @param {number} n
 */
const clamp = (min, max, n) => Math.min(Math.max(n, min), max);

module.exports = {
  toArray,
  getTimestamp,
  zPad,
  clamp
};
