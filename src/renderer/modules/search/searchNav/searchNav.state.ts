import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'searchNav')(state => state.route.search);
