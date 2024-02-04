import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'settingsNavigation')(state => state.route.settings);