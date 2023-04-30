import type { State } from '../types/state';

import rendererShape from '../../types/shapes/renderer.shape';
import themeShape from '../../types/shapes/theme.shape';
import userShape from '../../types/shapes/user.shape';
import { AppView, SettingsView } from '../../types/views';
import { AudioStatus } from '../lib/audio';
import Store from '../lib/store';

export default new Store<State>({
  app: {
    ready: false,
    scanning: false,
    path: {
      cover: '',
      thumb: ''
    }
  },
  playlist: {
    index: 0,
    songs: []
  },
  player: {
    ...userShape.player,
    ...rendererShape.player,
    current: {
      position: 0,
      duration: 0
    },
    status: AudioStatus.Stopped
  },
  view: {
    app: AppView.Album,
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
