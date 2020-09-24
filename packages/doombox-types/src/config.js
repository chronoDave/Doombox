const { TYPES } = require('./types');

module.exports = {
  [TYPES.CONFIG.PARSER]: {
    strict: false,
    fileTypes: ['mp3'],
    skipCovers: false,
    requiredMetadata: []
  },
  [TYPES.CONFIG.PLAYER]: {
    autoplay: true
  },
  [TYPES.CONFIG.KEYBINDS]: {
    rescan: 'mod+s',
    scanFolder: 'mod+shift+s',
    toggleDevTools: 'mod+shift+i'
  }
};
