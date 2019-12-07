const TYPE = {
  IPC: {
    KEYBIND: 'KEYBIND',
    LIBRARY: 'LIBRARY',
    CONFIG: 'CONFIG',
    MESSAGE: 'MESSAGE',
    INTERRUPT: 'INTERRUPT'
  }
};

const INTERRUPT = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

const ACTION = {
  AUDIO: {
    NEXT: 'NEXT',
    PREVIOUS: 'PREVIOUS',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    STOP: 'STOP',
    VOLUME_UP: 'VOLUME_UP',
    VOLUME_DOWN: 'VOLUME_DOWN',
    MUTE: 'MUTE'
  },
  CRUD: {
    CREATE: 'CREATE',
    READ: 'READ',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
  }
};

const ID = {
  WINDOW_MINIMIZE: 'window-minimize',
  WINDOW_MAXIMIZE: 'window-maximize',
  WINDOW_CLOSE: 'window-close'
};

module.exports = {
  TYPE,
  INTERRUPT,
  ACTION,
  ID
};
