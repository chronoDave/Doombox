module.exports = {
  display: {
    theme: 'dark',
    language: 'en',
    useLocalizedMetadata: true
  },
  parser: {
    strict: false,
    fileTypes: ['mp3'],
    skipCovers: false,
    requiredMetadata: [],
    tagTypes: ['ID3v2.3']
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
