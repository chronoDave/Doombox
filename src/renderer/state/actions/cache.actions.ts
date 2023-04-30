import produce from 'immer';

import player from '../player';
import store from '../store';

export const fetchCache = async () => {
  const cache = await window.ipc.cache.get();

  player.setVolume(cache.player.volume);
  player.mute(cache.player.muted);

  store.dispatch(produce(draft => {
    draft.view.app = cache.tab;
  }), 'cache.fetchCache');
};
