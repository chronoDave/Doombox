import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'settingsNav')(state => state.route.settings);
