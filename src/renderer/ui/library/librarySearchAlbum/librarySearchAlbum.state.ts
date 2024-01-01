import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'librarySearchAlbum')(state => state.search.albums);