import createSelector from '../../../../lib/store/selector';
import store from '../../../state/store';

export default createSelector(store, 'router')(state => state.route);
