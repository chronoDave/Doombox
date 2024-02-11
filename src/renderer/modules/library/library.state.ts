import { populateAlbums } from '../../selectors';
import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store, 'library')(state => ({
  current: state.player.current.id,
  labels: Array.from(state.entities.label.values()).map(label => ({
    ...label,
    albums: populateAlbums(state)(label.albums)
  }))
}));
