const zPad = require('./zPad');

/**
 * Format seconds into hh:mm:ss format
 * @param {number} n - Time in seconds
 * @param {object} options
 * @param {string} options.useText - Use text format (default `false`)
 * @param {boolean} options.displaySeconds - Should text format display seconds (default `false`)
 */
module.exports = (n, { useText = false, displaySeconds = false } = {}) => {
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const s = Math.floor((n % 3600) % 60);

  if (useText) return `${h > 0 ? `${h} h` : ''}${m} m${displaySeconds ? ` ${s} s` : ''}`;
  return `${h > 0 ? `${zPad(h, 2)}:` : ''}${zPad(m, 2)}:${zPad(s, 2)}`;
};
