import produce from 'immer';

import random from '@doombox/lib/math/random';
import { AudioStatus } from '@doombox/renderer/audio/audio';

import store from '../store';

import { play } from './player.actions';

export const addToQueue = (ids: string[]) => {
  if (ids.length === 0) return;

  store.set(produce(draft => {
    draft.queue.songs.push(...ids);
  }));

  if (
    !store.state.player.current.id &&
    store.state.queue.songs.length === 0 &&
    store.state.player.status !== AudioStatus.Playing
  ) play(ids[0]);
};

export const addLabelToQueue = (id: string) => {
  store.set(produce(draft => {
    const label = draft.entities.label.get(id);
    if (label) draft.queue.songs.push(...label.songs);
  }));

  if (
    !store.state.player.current.id &&
    store.state.queue.songs.length === 0 &&
    store.state.player.status !== AudioStatus.Playing
  ) play(store.state.queue.songs[0]);
};

export const addAlbumToQueue = (id: string) => {
  store.set(produce(draft => {
    const album = draft.entities.album.get(id);
    if (album) draft.queue.songs.push(...album.songs);
  }));

  if (
    !store.state.player.current.id &&
    store.state.queue.songs.length === 0 &&
    store.state.player.status !== AudioStatus.Playing
  ) play(store.state.queue.songs[0]);
};

export const setQueue = (ids: string[], title?: string) => {
  store.set(produce(draft => {
    draft.queue.songs = ids;
    draft.queue.index = 0;
    draft.queue.title = title ?? 'Queue';
  }));

  play(ids[0]);
};

export const playLabel = async (id: string) => {
  const label = await window.ipc.entity.label(id);

  store.set(produce(draft => {
    draft.queue.songs = label.songs;
    draft.queue.index = 0;
    draft.queue.title = label.label;
  }));

  play(store.state.queue.songs[0]);
};

export const playAlbum = async (id: string) => {
  const album = await window.ipc.entity.album(id);

  store.set(produce(draft => {
    draft.queue.songs = album.songs;
    draft.queue.index = 0;
    draft.queue.title = album.album ?? '???';
  }));

  play(store.state.queue.songs[0]);
};

export const setQueueIndex = (id: string) => {
  store.set(produce(draft => {
    const i = Math.max(0, draft.queue.songs.findIndex(song => song === id));

    draft.queue.index = i;
  }));

  play(store.state.queue.songs[store.state.queue.index]);
};

export const shuffleQueue = () => {
  store.set(produce(draft => {
    draft.queue.index = random(0, draft.queue.songs.length - 1);
  }));

  play(store.state.queue.songs[0]);
};

window.ipc.on.player.shuffle(shuffleQueue);
