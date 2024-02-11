import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'searchLabel')(state => state.search.labels);
