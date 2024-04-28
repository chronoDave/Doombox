import createSelector from '../../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'appRouter')(state => state.route.app);
