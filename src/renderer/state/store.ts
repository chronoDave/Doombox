import type { State } from './types';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { PlayerStatus } from '../lib/player';
import Store from '../lib/store';

import { ViewApp, ViewSettings } from './types';

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
    app: ViewApp.Song,
    settings: ViewSettings.Library
  },
  library: {
    search: {
      songs: [],
      albums: [],
      labels: []
    },
    songs: {
      list: [],
      map: new Map()
    },
    albums: [],
    labels: []
  },
  theme: themeShape,
  user: userShape
};

const store = new Store(state);

export default store;
