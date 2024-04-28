import createSelector from '../../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'homeToolbar')(state => ({
  route: {
    home: state.route.home
  },
  playlists: Array.from(state.entities.playlist.values())
}));
