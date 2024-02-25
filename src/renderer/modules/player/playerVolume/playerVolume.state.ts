import createSelector from '../../../lib/store/selector';
import store from '../../../store';

export default createSelector(store, 'playerVolume')(state => ({
  muted: state.player.muted,
  volume: state.player.volume
}));
