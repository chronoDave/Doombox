import createSelector from '../../../lib/store/selector';
import store from '../../state/store';

export default createSelector(store, 'appearance')(state => state.theme);
