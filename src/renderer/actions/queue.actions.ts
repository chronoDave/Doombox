import produce from 'immer';

import shuffle from '../../utils/array/shuffle';
import { hasAutoplay, populateSongs } from '../selectors';
import store from '../store';

import { play } from './player.actions';

export const addToQueue = (ids: string[]) => {
  store.dispatch(produce(draft => {
    draft.queue.songs.push(...ids);
  }), 'queue.add');

  if (hasAutoplay(store.get())) play(ids[0]);
};

export const addLabelToQueue = (id: string) => {
  const label = store.get().entities.label.get(id);
  if (!label) return;

  addToQueue(populateSongs(store.get())(label.songs).map(song => song._id));
};

export const setQueue = (ids: string[]) => {
  store.dispatch(produce(draft => {
    draft.queue.songs = ids;
    draft.queue.index = 0;
  }), 'queue.set');

  play(ids[0]);
};

export const playLabel = (id: string) => {
  const label = store.get().entities.label.get(id);
  if (!label) return;

  const songs = populateSongs(store.get())(label.songs)
    .map(song => song._id);

  store.dispatch(produce(draft => {
    draft.queue.songs = songs;
    draft.queue.index = 0;
  }), 'queue.playLabel');

  play(songs[0]);
};

export const playAlbum = (id: string) => {
  const album = store.get().entities.album.get(id);
  if (!album) return;

  const songs = populateSongs(store.get())(album.songs)
    .map(song => song._id);

  store.dispatch(produce(draft => {
    draft.queue.songs = songs;
    draft.queue.index = 0;
  }), 'queue.playAlbum');

  play(songs[0]);
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
