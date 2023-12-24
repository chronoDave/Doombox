import { currentPlayerSelector, populateAlbums } from '../../../selectors';
import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'library')(state => ({
  labels: Array.from(state.entities.label.values()).map(label => ({
    ...label,
    albums: populateAlbums(state)(label.albums)
  })),
  route: state.route.search,
  search: state.search,
  current: currentPlayerSelector(state)()?._id
}));
