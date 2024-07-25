import type { State } from './state';

import produce, { enableMapSet } from 'immer';

import Store from '@doombox/renderer/store/store';
import cacheShape from '@doombox/types/shapes/cache.shape';
import themeShape from '@doombox/types/shapes/theme.shape';
import userShape from '@doombox/types/shapes/user.shape';

import { AudioStatus } from '../../../lib/audio/audio';

import fetch from './ipc';
import * as Route from './route';

enableMapSet();
const store = new Store<State>({
  ipc: {
    parser: {
      size: null,
      file: null
    }
  },
  route: {
    app: Route.App.Load,
    home: Route.Home.Library,
    search: Route.Search.Song
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

fetch(store);

window.ipc.on.parser.file(file => {
  store.set(produce(draft => {
    draft.ipc.parser.file = file;
  }));
});

window.ipc.on.parser.size(size => {
  store.set(produce(draft => {
    draft.ipc.parser.size = size;
  }));
});

export default store;
