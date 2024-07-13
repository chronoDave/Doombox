import produce from 'immer';

import random from '@doombox/lib/math/random';

import sortSongs from '../lib/sort/sortSongs';
import { hasAutoplay, populateSongs } from '../selectors';
import store from '../store';

import { play } from './player.actions';

export const addToQueue = (ids: string[]) => {
  if (ids.length === 0) return;

  store.set(produce(draft => {
    draft.queue.songs.push(...ids);
  }), 'queue.add');

  if (!store.state.player.current.id && hasAutoplay(store.state)) play(ids[0]);
};

export const addLabelToQueue = (id: string) => {
  store.set(produce(draft => {
    const label = draft.entities.label.get(id);
    if (label) draft.queue.songs.push(...label.songs);
  }), 'queue.addLabel');

  if (!store.state.player.current.id && hasAutoplay(store.state)) play(store.state.queue.songs[0]);
};

export const addAlbumToQueue = (id: string) => {
  store.set(produce(draft => {
    const album = draft.entities.album.get(id);
    if (album) draft.queue.songs.push(...album.songs);
  }), 'queue.addAlbum');

  if (!store.state.player.current.id && hasAutoplay(store.state)) play(store.state.queue.songs[0]);
};

export const setQueue = (ids: string[], title?: string) => {
  store.set(produce(draft => {
    draft.queue.songs = ids;
    draft.queue.index = 0;
    draft.queue.title = title ?? 'Queue';
  }), 'queue.set');

  play(ids[0]);
};

export const playLabel = (id: string) => {
  store.set(produce(draft => {
    const label = draft.entities.label.get(id);

    if (label) {
      const songs = populateSongs(draft)(label.songs)
        .sort(sortSongs)
        .map(song => song._id);

      draft.queue.songs = songs;
      draft.queue.index = 0;
      draft.queue.title = label.label;
    }
  }), 'queue.playLabel');

  play(store.state.queue.songs[0]);
};

export const playAlbum = (id: string) => {
  store.set(produce(draft => {
    const album = draft.entities.album.get(id);

    if (album) {
      const songs = populateSongs(draft)(album.songs)
        .sort(sortSongs)
        .map(song => song._id);

      draft.queue.songs = songs;
      draft.queue.index = 0;
      draft.queue.title = album.album ?? '???';
    }
  }), 'queue.playAlbum');

  play(store.state.queue.songs[0]);
};

export const setQueueIndex = (id: string) => {
  store.set(produce(draft => {
    const i = Math.max(0, draft.queue.songs.findIndex(song => song === id));

    draft.queue.index = i;
  }), 'queue.setIndex');

  play(store.state.queue.songs[store.state.queue.index]);
};

export const shuffleQueue = () => {
  store.set(produce(draft => {
    draft.queue.index = random(0, draft.queue.songs.length - 1);
  }), 'queue.shuffle');

  play(store.state.queue.songs[0]);
};

window.ipc.on.shuffle(shuffleQueue);
