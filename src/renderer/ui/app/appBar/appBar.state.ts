import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'appBar')(state =>
  state.entities.song.get(state.player.current.id ?? ''));
