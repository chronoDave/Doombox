import createSelector from '@doombox/renderer/store/selector';

import store from '../../../store';

export default createSelector(store, 'playerSlider')(state => ({
  duration: state.player.current.duration,
  position: state.player.current.position
}));
