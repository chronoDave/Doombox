import createSelector from '../../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'searchLabel')(state => state.search.labels);
