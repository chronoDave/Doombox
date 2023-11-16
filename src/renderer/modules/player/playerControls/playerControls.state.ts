import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'playerControls')(state => state.player.status);
