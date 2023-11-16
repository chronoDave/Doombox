import store from '../../../store';
import createSelector from '../../../utils/createSelector';

export default createSelector(store, 'playerVolume')(state => ({
  muted: state.player.muted,
  volume: state.player.volume
}));
