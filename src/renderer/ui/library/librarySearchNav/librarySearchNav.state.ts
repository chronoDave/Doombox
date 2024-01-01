import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'librarySearchNav')(state => state.route.search);
