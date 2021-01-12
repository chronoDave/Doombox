module.exports = {
  display: {
    theme: 'dark',
    language: 'en',
    useLocalizedMetadata: true
  },
  search: {
    artist: true,
    title: true,
    album: true,
    publisher: true
  },
  parser: {
    strict: false,
    fileType: 'mp3',
    tagType: 'ID3v2.3',
    skipCovers: false,
    requiredMetadata: [],
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
    preferences: 'mod+p',
    search: 'mod+f'
  }
};
