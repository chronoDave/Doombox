import type { State } from './types/state';

import cacheShape from '../types/shapes/cache.shape';
import themeShape from '../types/shapes/theme.shape';
import userShape from '../types/shapes/user.shape';

import { AudioStatus } from './lib/audio/audio';
import Store from './lib/store/store';
import * as Route from './types/route';

export default new Store<State>({
  route: {
    app: Route.App.Load,
    home: Route.Home.Library,
    search: Route.Search.Song,
    settings: Route.Settings.Library
  },
  queue: {
    title: 'Queue',
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
  search: {
    songs: [],
    albums: [],
    labels: []
  },
  entities: {
    song: new Map(),
    album: new Map(),
    label: new Map(),
    playlist: new Map()
  },
  theme: themeShape,
  user: userShape
});
