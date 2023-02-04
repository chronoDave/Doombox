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
    position: 0,
    status: PlayerStatus.Stopped,
    current: {},
    playlist: {
      index: 0,
      songs: []
    }
  },
  view: {
    app: ViewApp.Player,
    settings: ViewSettings.Library
  },
  library: {
    songs: new Map(),
    albums: [],
    labels: []
  },
  theme: themeShape,
  user: userShape
};

const store = new Store(state);

export default store;
