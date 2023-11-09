import store from '../../state/store';
import createSelector from '../../utils/createSelector';

export default createSelector(store)(state =>
  state.entities.song.get(state.player.current.id ?? ''));
