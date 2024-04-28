import createSelector from '../../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'playerControls')(state => state.player.status);
