const TYPES = {
  DATABASE: {
    LIBRARY: 'library',
    IMAGES: 'images'
  },
  STORAGE: {
    WINDOW: 'window'
  }
};

const STATUS = {
  AUDIO: {
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    STOPPED: 'STOPPED'
  }
};

const EVENTS = {
  AUDIO: {
    POSITION: 'POSITION',
    VOLUME: 'VOLUME',
    MUTED: 'MUTED',
    PLAYLIST: 'PLAYLIST',
    DURATION: 'DURATION',
    METADATA: 'METADATA',
    STATUS: 'STATUS'
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

module.exports = {
  TYPES,
  STATUS,
  EVENTS,
  IPC,
  CACHE,
  THEME
};
