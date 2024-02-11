import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'settingsLibrary')(state => state.user.library);
