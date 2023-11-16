import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'settingsAppearance')(state => state.theme.theme);
