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
      return `${'0'.repeat(d - i)}${n}`;
    }
  }
  return n;
};

/**
 * Format seconds into hh:mm:ss format
 * @param {number} n - Time in seconds
 * @param {string} useText - Use text format (default `false`)
 */
const formatTime = (n, useText = false) => {
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const s = Math.floor((n % 3600) % 60);

  if (useText) return `${h > 0 ? `${h} h` : ''}${m} m`;
  return `${h > 0 ? `${zPad(h)}:` : ''}${zPad(m)}:${zPad(s)}`;
};

/**
 * Clamp `n` between `min` and `max`
 * @param {number} min
 * @param {number} max
 * @param {number} n
 */
const clamp = (min, max, n) => Math.min(Math.max(n, min), max);

/** Shuffle array */
const shuffle = a => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const s = a.slice();
    for (let i = s.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const swap = s[j];
      s[j] = s[i];
      s[i] = swap;
    }
    if (s.length <= 1 || s.some((v, i) => v !== a[i])) return s;
  }
};

module.exports = {
  toArray,
  getTimestamp,
  formatTime,
  shuffle,
  zPad,
  clamp
};
