import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store, 'library')(state => state.search.query);
