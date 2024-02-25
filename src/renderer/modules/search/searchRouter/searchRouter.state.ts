import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'searchRouter')(state => state.route.search);
