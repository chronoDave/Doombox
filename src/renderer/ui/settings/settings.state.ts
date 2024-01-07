import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store, 'settings')(state => state.route.settings);
