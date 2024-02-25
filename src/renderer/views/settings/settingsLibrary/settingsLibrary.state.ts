import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'settingsLibrary')(state => state.user.library);
