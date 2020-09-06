const TYPES = {
  DATABASE: {
    LIBRARY: 'library',
    IMAGES: 'images'
  },
  CACHE: {
    WINDOW: 'window',
    VOLUME: 'volume'
  },
  CONFIG: {
    PLAYER: 'player'
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

module.exports = {
  TYPES,
  STATUS,
  EVENTS,
  IPC
};
