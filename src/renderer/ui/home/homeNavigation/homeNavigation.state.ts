import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'homeNavigation')(state => state.route.home);
