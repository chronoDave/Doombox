import createSelector from '@doombox/renderer/store/selector';

import store from '../../store';

export default createSelector(store, 'app')(state => {
  const current = state.entities.song.get(state.player.current.id ?? '');

  return current ?
    `${current.artist} - ${current.title} (${current.album})` :
    'Doombox';
});
