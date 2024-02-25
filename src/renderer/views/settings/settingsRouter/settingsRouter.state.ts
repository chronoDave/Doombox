import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'settingsRouter')(state => state.route.settings);
