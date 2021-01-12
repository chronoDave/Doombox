const { CACHE } = require('@doombox-config');
const { WINDOW } = require('@doombox-utils/types');

const Storage = require('./storage');

module.exports = class Cache extends Storage {
  constructor(root) {
    super(root, 'cache', CACHE);

    const payload = this.read();
    this.data = {
      player: {
        muted: this.normalizeBool(payload, 'player.muted'),
        volume: this.normalizeInt(payload, 'player.volume', { min: 0, max: 1 })
      },
      tabs: {
        search: this.normalizeEnum(payload, 'tabs.search', [
          WINDOW.TABS.SONGS,
          WINDOW.TABS.ALBUMS,
          WINDOW.TABS.LABELS
        ])
      }
    };
  }
};
