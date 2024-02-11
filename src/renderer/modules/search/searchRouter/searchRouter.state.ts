import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'searchRouter')(state => state.route.search);
