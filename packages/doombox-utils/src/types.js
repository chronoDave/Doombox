const TYPES = {
  DATABASE: {
    LIBRARY: 'library',
    IMAGES: 'images'
  },
  CACHE: {
    WINDOW: 'window',
    VOLUME: 'volume',
    FOLDERS: 'folders'
  },
  CONFIG: {
    PARSER: 'parser',
    PLAYER: 'player',
    KEYBINDS: 'keybinds'
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
    LIBRARY: 'LIBRARY',
    THEME: 'THEME',
    CACHE: 'CACHE',
    CONFIG: 'CONFIG'
  },
  ACTION: {
    INSERT: 'INSERT',
    FIND: 'FIND',
    FIND_BY_ID: 'FIND_BY_ID',
    UPDATE: 'UPDATE',
    UPDATE_BY_ID: 'UPDATE_BY_ID',
    DELETE: 'DELETE',
    DELETE_BY_ID: 'DELETE_BY_ID',
    DROP: 'DROP',
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
