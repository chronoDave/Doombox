import createSelector from '@doombox/renderer/store/selector';

import store from '../../../store';

export default createSelector(store, 'playerVolume')(state => ({
  muted: state.player.muted,
  volume: state.player.volume
}));
