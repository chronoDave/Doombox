import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'searchNav')(state => state.route.search);
