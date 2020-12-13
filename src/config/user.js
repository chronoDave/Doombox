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
    nextSong: 'mod+alt+right',
    previousSong: 'mod+alt+left',
    playPause: 'mod+alt+\\',
    muteUnmute: 'mod+alt+m',
    preferences: 'mod+p'
  }
};
