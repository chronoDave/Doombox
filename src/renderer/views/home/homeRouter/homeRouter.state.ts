import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'homeRouter')(state => state.route.home);
