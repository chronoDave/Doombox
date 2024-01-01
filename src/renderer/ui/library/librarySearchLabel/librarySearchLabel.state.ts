import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'librarySearchLabel')(state => state.search.labels);
