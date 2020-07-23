const IPC = {
  CHANNEL: {
    THEME: 'THEME',
    NOTIFICATION: 'NOTIFICATION',
    WINDOW: 'WINDOW'
  },
  ACTION: {
    CREATE: 'CREATE',
    READ: 'READ',
    READ_ONE: 'READ_ONE',
    UPDATE: 'UPDATE',
    UPDATE_ONE: 'UPDATE_ONE',
    DELETE: 'DELETE',
    DELETE_ONE: 'DELETE_ONE',
    DROP: 'DROP',
    AUDIO: {
      PLAY: 'PLAY',
      PAUSE: 'PAUSE',
      STOP: 'STOP',
      NEXT: 'NEXT',
      PREVIOUS: 'PREVIOUS',
      VOLUME_UP: 'VOLUME_UP',
      VOLUME_DOWN: 'VOLUME_DOWN',
      MUTE: 'MUTE'
    },
    WINDOW: {
      SET_TITLE: 'SET_TITLE',
      MINIMIZE: 'MINIMIZE',
      MAXIMIZE: 'MAXIMIZE',
      CLOSE: 'CLOSE',
      SET_THUMBAR: 'SET_THUMBAR'
    }
  }
};

const STATUS = {
  AUDIO: {
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED'
  }
};

const STORAGE = {
  GENERAL: 'general',
  WINDOW: 'window'
};

const CACHE = {
  [STORAGE.WINDOW]: {
    width: 640,
    height: 480
  }
};

const CONFIG = {
  [STORAGE.GENERAL]: {
    forceQuit: false
  }
};

const THEME = {
  variant: 'dark',
  grey: {
    light: '#fafafa',
    dark: '#202225'
  },
  ramp: {
    50: 0,
    100: 0.02,
    200: 0.06,
    300: 0.11,
    400: 0.23,
    500: 0.45,
    600: 0.51,
    700: 0.59,
    800: 0.72,
    900: 0.87
  }
};

/** Cast any to array */
const toArray = any => (Array.isArray(any) ? any : [any]);

/**
 * Zero padding
 * @param {string|number} n
 * @param {number} depth - Padding depth (default `1`)
 * */
const zeroPad = (n, depth = 1) => {
  for (let i = 0; i < depth; i += 1) {
    if (parseInt(n, 10) < (10 ** (i + 1))) {
      return `${'0'.repeat(depth - i)}${n}`;
    }
  }
  return n;
};

/** Return formatted timestamp */
const getTimestamp = () => new Date()
  .toISOString()
  .replace(/\.|:/g, '_');

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
  STATUS,
  IPC,
  STORAGE,
  CACHE,
  CONFIG,
  THEME,
  zeroPad,
  toArray,
  getTimestamp,
  promiseConcurrent
};
