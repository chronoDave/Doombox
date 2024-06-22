import type { State } from './types/state';
import type { Reducer } from '@doombox/lib/store/store';
import type * as forgo from 'forgo';

import Store from '@doombox/lib/store/store';
import cacheShape from '@doombox/types/shapes/cache.shape';
import themeShape from '@doombox/types/shapes/theme.shape';
import userShape from '@doombox/types/shapes/user.shape';

import { AudioStatus } from './lib/audio/audio';
import * as Route from './types/route';

const store = new Store<State>({
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

export const select = <T>(reducer: Reducer<State, T>) =>
  (component: forgo.Component) =>
    store.select(reducer)(state => component.update({ state }));

export default store;
