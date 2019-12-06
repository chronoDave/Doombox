const TYPES_IPC = {
  KEYBOARD: 'KEYBOARD',
  LIBRARY: 'LIBRARY'
};

const COMMANDS_AUDIO = {
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  VOLUME_UP: 'VOLUME_UP',
  VOLUME_DOWN: 'VOLUME_DOWN',
  MUTE: 'MUTE'
};

const COMMANDS_CRUD = {
  CREATE: 'CREATE',
  READ: 'READ',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
};

const ELEMENT_IDS = {
  WINDOW_MINIMIZE: 'window-minimize',
  WINDOW_MAXIMIZE: 'window-maximize',
  WINDOW_CLOSE: 'window-close'
};

module.exports = {
  TYPES_IPC,
  COMMANDS_AUDIO,
  ELEMENT_IDS
};
