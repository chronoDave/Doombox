const crypto = require('crypto');

/** Casts to array */
const toArray = any => (Array.isArray(any) ? any : [any]);

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
 * Capitalize string
 * @param {string} s
 */
const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`;

/**
 * Format seconds into hh:mm:ss format
 * @param {number} n - Time in seconds
 * @param {object} options
 * @param {string} options.useText - Use text format (default `false`)
 * @param {boolean} options.displaySeconds - Should text format display seconds (default `false`)
 */
const formatTime = (n, { useText = false, displaySeconds = false } = {}) => {
  const h = Math.floor(n / 3600);
  const m = Math.floor((n % 3600) / 60);
  const s = Math.floor((n % 3600) % 60);

  if (useText) return `${h > 0 ? `${h} h` : ''}${m} m${displaySeconds ? ` ${s} s` : ''}`;
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

const isMac = process.platform === 'darwin';

/** Normalize keybind */
const normalizeKeybind = keybind => keybind
  .split('+')
  .map(char => {
    if (char === 'mod') {
      if (isMac) return '\u2318';
      return 'Ctrl';
    }
    if (char === 'shift' && isMac) return '\u21e7';
    if ((char === 'option' || char === 'alt') && isMac) return '\u03b1';
    return capitalize(char);
  })
  .join('+');

const keybindToAccelerator = keybind => keybind
  .split('+')
  .map(char => {
    if (char === 'mod') return 'Command';
    return capitalize(char);
  })
  .join('+');

/**
 * Create hash _id
 * @param {string} seed - Hash seed
 * */
const createId = seed => crypto
  .createHash('md5')
  .update(seed)
  .digest('hex');

module.exports = {
  toArray,
  getTimestamp,
  formatTime,
  normalizeKeybind,
  keybindToAccelerator,
  createId,
  capitalize,
  shuffle,
  isMac,
  zPad,
  clamp
};
