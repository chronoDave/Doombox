import type { State } from '../types/state';

import cacheShape from '../../types/shapes/cache.shape';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { AppView } from '../../types/views';
import { AudioStatus } from '../lib/audio';
import Store from '../lib/store';

export default new Store<State>({
  app: {
    ready: false,
    scanning: false,
    directory: {
      thumbs: null
    }
  },
  queue: {
    index: 0,
    songs: []
  },
  player: {
    ...userShape.player,
    ...cacheShape.player,
    current: {
      id: null,
      position: 0,
      duration: 0
    },
    status: AudioStatus.Stopped
  },
  view: {
    app: AppView.Library,
    settings: null
  },
  search: {
    songs: null,
    albums: null,
    labels: null
  },
  entities: {
    song: new Map(),
    album: new Map(),
    label: new Map()
  },
  theme: themeShape,
  user: userShape
});
