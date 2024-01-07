import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'homeNavigation')(state => ({
  route: {
    home: state.route.home,
    settings: state.route.settings
  },
  playlists: Array.from(state.entities.playlist.values())
}));
