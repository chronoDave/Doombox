import type { State } from '../types/state';

import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { PlayerStatus } from '../lib/player';
import { AppView, SettingsView } from '../types/view';

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
    }
  },
  playlist: {
    index: 0,
    songs: []
  },
  view: {
    app: AppView.Label,
    settings: SettingsView.Library
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

export default state;
