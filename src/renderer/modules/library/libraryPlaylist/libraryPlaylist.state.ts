import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store)(state => Array.from(state.entities.playlist.values()));
