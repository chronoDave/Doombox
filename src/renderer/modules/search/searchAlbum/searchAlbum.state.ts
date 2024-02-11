import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'searchAlbum')(state => state.search.albums);
