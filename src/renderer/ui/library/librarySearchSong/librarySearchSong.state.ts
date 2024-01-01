import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'librarySearchSong')(state => state.search.songs);
