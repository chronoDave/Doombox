import createSelector from '@doombox/renderer/store/selector';

import store from '../../../store';

export default createSelector(store, 'homeToolbar')(state => ({
  route: {
    home: state.route.home
  },
  playlists: Array.from(state.entities.playlist.values())
}));
