import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'settingsRouter')(state => state.view.settings);
