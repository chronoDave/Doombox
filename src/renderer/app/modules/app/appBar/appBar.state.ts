import createSelector from '@doombox/renderer/store/selector';

import store from '../../../store';

export default createSelector(store, 'appBar')(state =>
  state.entities.song.get(state.player.current.id ?? ''));
