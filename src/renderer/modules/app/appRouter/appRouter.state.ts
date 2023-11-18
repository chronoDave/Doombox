import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'libraryRouter')(state => state.view.app);
