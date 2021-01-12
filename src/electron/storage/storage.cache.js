const { CACHE } = require('@doombox-config');
const { WINDOW } = require('@doombox-utils/types');

const Storage = require('./storage');

module.exports = class Cache extends Storage {
  constructor(root) {
    super(root, 'cache', CACHE);

    const payload = this.read();
    this.data = {
      window: {
        x: this.normalizeInt(payload, 'window.x', { min: 0 }),
        y: this.normalizeInt(payload, 'window.y', { min: 0 }),
        width: this.normalizeInt(payload, 'window.width', { min: 0 }),
        height: this.normalizeInt(payload, 'window.height', { min: 0 }),
      },
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
