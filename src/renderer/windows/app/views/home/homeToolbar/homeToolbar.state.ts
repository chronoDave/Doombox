import store from '../../../store';

export default store.select(state => ({
  route: {
    home: state.route.home
  },
  playlists: Array.from(state.entities.playlist.values())
}));
