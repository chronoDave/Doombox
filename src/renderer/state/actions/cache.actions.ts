import produce from 'immer';

import store from '../store';

export const fetchCache = async () => {
  const cache = await window.ipc.cache.get();

  store.dispatch(produce(draft => {
    draft.view.app = cache.tab;
    draft.player.volume = cache.player.volume;
    draft.player.muted = cache.player.muted;
  }), 'cache.fetchCache');
};
