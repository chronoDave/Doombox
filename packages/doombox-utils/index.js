const TYPES = {
  DATABASE: {
    LIBRARY: 'library',
    IMAGES: 'images'
  },
  STORAGE: {
    WINDOW: 'window'
  },
  STATUS: {
    AUDIO: {
      PLAYING: 'PLAYING',
      PAUSED: 'PAUSED',
      STOPPED: 'STOPPED'
    }
  }
};

const IPC = {
  CHANNEL: {
    WINDOW: 'WINDOW',
    THEME: 'THEME',
    CACHE: 'CACHE',
    CONFIG: 'CONFIG'
  },
  ACTION: {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    WINDOW: {
      SET_TITLE: 'SET_TITLE',
      MINIMIZE: 'MINIMIZE',
      MAXIMIZE: 'MAXIMIZE',
      CLOSE: 'CLOSE',
      SET_THUMBAR: 'SET_THUMBAR'
    },
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
  }
};

const CACHE = {
  [TYPES.STORAGE.WINDOW]: {
    width: 320,
    height: 240
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

const toArray = any => (Array.isArray(any) ? any : [any]);
const sanitizeFileName = string => string
  .replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');
const getTimestamp = () => new Date()
  .toISOString()
  .replace(/\.|:/g, '_');
const zeroPad = (txt, n = 1) => {
  for (let i = 0; i < n; i += 1) {
    if (parseInt(txt, 10) < (10 ** (i + 1))) {
      return `${'0'.repeat(n - i)}${n}`;
    }
  }
  return txt;
};

module.exports = {
  TYPES,
  IPC,
  CACHE,
  THEME,
  toArray,
  sanitizeFileName,
  getTimestamp,
  zeroPad
};
