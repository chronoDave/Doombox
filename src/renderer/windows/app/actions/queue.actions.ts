import produce from 'immer';

import random from '@doombox/lib/math/random';

import sortSongs from '../lib/sort/sortSongs';
import { hasAutoplay, populateSongs } from '../selectors';
import store from '../store';

import { play } from './player.actions';

export const addToQueue = (ids: string[]) => {
  if (ids.length === 0) return;

  store.dispatch(produce(draft => {
    draft.queue.songs.push(...ids);
  }), 'queue.add');

  if (
    !store.get().player.current.id &&
    hasAutoplay(store.get())
  ) play(ids[0]);
};

export const addLabelToQueue = (id: string) => {
  const label = store.get().entities.label.get(id);
  if (!label) return;

  addToQueue(label.songs);
};

export const addAlbumToQueue = (id: string) => {
  const album = store.get().entities.album.get(id);
  if (!album) return;

  addToQueue(album.songs);
};

export const setQueue = (ids: string[], title?: string) => {
  store.dispatch(produce(draft => {
    draft.queue.songs = ids;
    draft.queue.index = 0;
    draft.queue.title = title ?? 'Queue';
  }), 'queue.set');

  play(ids[0]);
};

export const playLabel = (id: string) => {
  const label = store.get().entities.label.get(id);
  if (!label) return;

  const songs = populateSongs(store.get())(label.songs)
    .sort(sortSongs)
    .map(song => song._id);

  store.dispatch(produce(draft => {
    draft.queue.songs = songs;
    draft.queue.index = 0;
    draft.queue.title = label.label;
  }), 'queue.playLabel');

  play(songs[0]);
};

export const playAlbum = (id: string) => {
  const album = store.get().entities.album.get(id);
  if (!album) return;

  const songs = populateSongs(store.get())(album.songs)
    .sort(sortSongs)
    .map(song => song._id);

  store.dispatch(produce(draft => {
    draft.queue.songs = songs;
    draft.queue.index = 0;
    draft.queue.title = album.album ?? 'Queue';
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

  const n = random(0, songs.length - 1);
  store.dispatch(produce(draft => {
    draft.queue.index = n;
  }), 'queue.shuffle');

  play(songs[n]);
};

window.ipc.on.shuffle(shuffleQueue);
