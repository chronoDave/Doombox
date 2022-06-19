const { CONFIG } = require('../../config');
const { LANGUAGES } = require('../../intl/intl');

const Storage = require('./storage');

module.exports = class Cache extends Storage {
  constructor(root) {
    super(root, 'config', CONFIG);

    const payload = this.read();
    this.data = {
      display: {
        theme: this.normalizeEnum(payload, 'display.theme', ['dark', 'light']),
        language: this.normalizeEnum(payload, 'display.language', Object.keys(LANGUAGES)),
        useLocalizedMetadata: this.normalizeBool(payload, 'display.useLocalizedMetadata')
      },
      search: {
        artist: this.normalizeBool(payload, 'search.artist'),
        title: this.normalizeBool(payload, 'search.title'),
        album: this.normalizeBool(payload, 'search.album'),
        albumartist: this.normalizeBool(payload, 'search.albumartist'),
        publisher: this.normalizeBool(payload, 'search.publisher')
      },
      parser: {
        strict: this.normalizeBool(payload, 'parser.strict'),
        fileType: this.normalizeString(payload, 'parser.fileType'),
        tagType: this.normalizeString(payload, 'parser.tagType'),
        skipCovers: this.normalizeBool(payload, 'parser.skipCovers'),
        requiredMetadata: this.normalizeArray(
          payload,
          'parser.requiredMetadata',
          value => typeof value !== 'string'
        )
      },
      player: {
        autoplay: this.normalizeBool(payload, 'player.autoplay')
      },
      keybinds: {
        rescan: this.normalizeString(payload, 'keybinds.rescan'),
        scanFolder: this.normalizeString(payload, 'keybinds.scanFolder'),
        nextSong: this.normalizeString(payload, 'keybinds.nextSong'),
        previousSong: this.normalizeString(payload, 'keybinds.previousSong'),
        playPause: this.normalizeString(payload, 'keybinds.playPause'),
        muteUnmute: this.normalizeString(payload, 'keybinds.muteUnmute'),
        preferences: this.normalizeString(payload, 'keybinds.preferences'),
        search: this.normalizeString(payload, 'keybinds.search'),
        volumeUp: this.normalizeString(payload, 'keybinds.volumeUp'),
        volumeDown: this.normalizeString(payload, 'keybinds.volumeDown')
      }
    };
  }
};
