import type { State } from '../types/state';

import appShape from '../../types/shapes/app.shape';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { AudioStatus } from '../lib/audio';
import Store from '../lib/store';
import { AppView, SettingsView } from '../types/view';

export default new Store<State>({
  app: {
    ready: false,
    scanning: false
  },
  playlist: {
    index: 0,
    songs: []
  },
  player: {
    ...userShape.player,
    ...appShape.player,
    current: {
      position: 0,
      duration: 0
    },
    status: AudioStatus.Stopped
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
});
