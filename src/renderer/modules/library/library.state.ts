import { populateAlbums } from '../../selectors';
import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store, 'library')(state => ({
  current: state.player.current.id,
  data: Array.from(state.entities.label.values())
    .map(label => [
      label,
      populateAlbums(state)(label.albums)
    ])
    .flat(2)
}));
