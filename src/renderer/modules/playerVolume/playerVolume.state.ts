import store from '../../store';
import createSelector from '../../utils/createSelector';

export default createSelector(store)(state => ({
  muted: state.player.muted,
  volume: state.player.volume
}));
