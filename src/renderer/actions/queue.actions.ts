import produce from 'immer';

import shuffle from '../../utils/array/shuffle';
import { AudioStatus } from '../lib/audio';
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

export const setQueueIndex = (id: string) => {
  const { songs } = store.get().queue;
  const i = Math.max(0, songs.findIndex(song => song === id));

  store.dispatch(produce(draft => {
    draft.queue.index = i;
  }), 'queue.setIndex');

  play(songs[i]);
};

export const shuffleQueue = () => {
  const { songs } = store.get().queue;
  if (songs.length === 0) return;

  const shuffled = shuffle(songs);

  store.dispatch(produce(draft => {
    draft.queue.songs = shuffled;
    draft.queue.index = 0;
  }), 'queue.shuffle');

  play(shuffled[0]);
};
