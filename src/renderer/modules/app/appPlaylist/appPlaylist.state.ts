import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'libraryPlaylist')(state => ({
  current: state.player.current.id,
  playlists: Array.from(state.entities.playlist.values()),
  songs: state.entities.song
}));
