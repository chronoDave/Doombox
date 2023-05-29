import produce from 'immer';

import { AudioStatus } from '../../lib/audio';
import store from '../store';

import { play } from './player.actions';

export const addToQueue = (ids: string[]) => {
  const autplay =
    store.get().queue.songs.length === 0 &&
    store.get().player.status !== AudioStatus.Playing;

  store.dispatch(produce(draft => {
    draft.queue.songs.push(...ids);
  }), 'queue.add');

  if (autplay) play(ids[0]);
};

export const setQueue = (ids: string[]) => {
  store.dispatch(produce(draft => {
    draft.queue.songs = ids;
    draft.queue.index = 0;
  }), 'queue.set');

  play(ids[0]);
};
