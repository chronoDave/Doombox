const crypto = require('crypto');

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
 * Capitalize string
 * @param {string} s
 */
const capitalize = s => `${s[0].toUpperCase()}${s.slice(1)}`;

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
 * Create Redux slice
 * @param {string} name - Reducer name
 * @param {object} initialState
 * @param {object[]} reducers - Array of reducers
 */
const createReduxSlice = (name, initialState, reducers) => {
  const reducer = (state = initialState, action) => {
    if (!reducers[action.type]) return state;
    return reducers[action.type](state, action.payload);
  };

  const actions = Object
    .keys(reducers)
    .reduce((acc, key) => ({
      ...acc,
      [key]: payload => ({ type: key, payload })
    }), {});

  return ({ name, reducer, actions });
};

/**
 * Create hash _id
 * @param {string} seed - Hash seed
 * */
const createId = seed => crypto
  .createHash('md5')
  .update(seed)
  .digest('hex');

/**
 * `Promise.all()` with concurrency limit
 * @param {array} array
 * @param {function} cb `f(array[i], i, array) => Promise`
 * @param {number} limit
 *
 * Based on: https://github.com/mhjam/async-pool
 */
const promiseConcurrent = async (array, cb, limit = 16) => {
  const stack = [];
  const current = [];

  let i = 0;
  const queue = () => {
    if (i === array.length) return Promise.resolve();

    // eslint-disable-next-line no-plusplus
    const p = Promise.resolve().then(() => cb(array[i++], i));
    stack.push(p);

    let r = Promise.resolve();
    if (limit <= array.length) {
      const e = p.then(() => current.splice(current.indexOf(e), 1));
      current.push(e);

      if (current.length >= limit) {
        r = Promise.race(current);
      }
    }

    return r.then(() => queue());
  };

  return queue().then(() => Promise.all(stack));
};

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
  createReduxSlice,
  promiseConcurrent,
  clamp
};
