import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'searchSong')(state => state.search.songs);
