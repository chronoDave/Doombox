module.exports = {
  language: 'en',
  parser: {
    strict: false,
    fileTypes: ['mp3'],
    skipCovers: false,
    requiredMetadata: []
  },
  player: {
    autoplay: true
  },
  keybinds: {
    rescan: 'mod+s',
    scanFolder: 'mod+shift+s',
    toggleDevTools: 'mod+shift+i',
    nextSong: 'mod+alt+right',
    previousSong: 'mod+alt+left',
    playPause: 'mod+alt+\\'
  }
};
