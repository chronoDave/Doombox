import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'searchAlbum')(state => state.search.albums);
