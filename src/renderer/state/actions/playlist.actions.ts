import produce from 'immer';

import { AudioStatus } from '../../lib/audio';
import { playlistIdSelector } from '../selectors/playlist.selectors';
import store from '../store';

import { play } from './player.actions';

export const addToPlaylist = (ids: string[]) => {
  const autplay =
    store.get().playlist.songs.length === 0 &&
    store.get().player.status !== AudioStatus.Playing;

  store.dispatch(produce(draft => {
    draft.playlist.songs.push(...ids);
  }), 'playlist.add');

  if (autplay) play(ids[0]);
};

export const setPlaylist = (ids: string[]) => {
  store.dispatch(produce(draft => {
    draft.playlist.songs = ids;
    draft.playlist.index = 0;
  }), 'playlist.add');

  play(ids[0]);
};

export const next = () => {
  if (store.get().playlist.index < store.get().playlist.songs.length) {
    store.dispatch(produce(draft => {
      draft.playlist.index += 1;
    }), 'playlist.next');

    play(playlistIdSelector.get());
  }
};
