import produce from 'immer';

import store from '../store';

import { play } from './player.actions';

export const addToPlaylist = (ids: string[]) => {
  const isEmpty = store.get().playlist.songs.length === 0;

  store.dispatch(produce(draft => {
    draft.playlist.songs.push(...ids);
  }), 'playlist.add');

  if (isEmpty) play(ids[0]);
};
