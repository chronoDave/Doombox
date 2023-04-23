import type { State } from './state';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { PlayerStatus } from '../lib/player';
import Store from '../lib/store';

import { ViewApp, ViewSettings } from './state';

const state: State = {
  app: {
    ready: false,
    scanning: false
  },
  player: {
    muted: false,
    volume: 100,
    status: PlayerStatus.Stopped,
    current: {
      id: '',
      duration: 0,
      position: 0
    },
    playlist: {
      index: 0,
      songs: []
    }
  },
  view: {
    app: ViewApp.Label,
    settings: ViewSettings.Library
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
};

const store = new Store(state);

export default store;
