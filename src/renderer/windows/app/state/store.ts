import type { State } from './state';

import produce from 'immer';

import Store from '@doombox/renderer/store/store';
import cacheShape from '@doombox/types/shapes/cache.shape';
import themeShape from '@doombox/types/shapes/theme.shape';
import userShape from '@doombox/types/shapes/user.shape';

import { AudioStatus } from '../../../lib/audio/audio';

import * as Route from './route';

const store = new Store<State>({
  route: {
    app: Route.App.Load,
    home: Route.Home.Library,
    search: Route.Search.Song
  },
  dir: {
    thumbs: ''
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

window.ipc.on.song(() => {
  store.set(produce(draft => {
    draft.route.app = Route.App.Scan;
  }));
});

export default store;
