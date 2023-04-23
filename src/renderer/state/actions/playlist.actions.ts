import produce from 'immer';

import store from '../store';

export const addToPlaylist = (ids: string[]) => {
  store.dispatch(produce(draft => {
    draft.playlist.songs.push(...ids);
  }), 'playlist.add');
};
