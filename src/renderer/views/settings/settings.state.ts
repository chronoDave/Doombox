import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store)(state => state.view.settings);
