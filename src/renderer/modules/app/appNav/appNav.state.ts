import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'libraryNavigation')(state => state.view.app);
