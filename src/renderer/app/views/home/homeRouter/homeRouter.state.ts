import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'homeRouter')(state => state.route.home);
