import type { Playlist } from '@doombox/types/playlist';

import produce from 'immer';

import store from '../store';

export const createPlaylist = async (songs?: string[]) => {
  if (!songs) return;
  const playlist = await window.ipc.playlist.add(songs);

  store.set(produce(draft => {
    draft.entities.playlist.set(playlist._id, playlist);
  }));
};

export const updatePlaylist = async (playlist: Playlist) => {
  await window.ipc.playlist.update(playlist);

  store.set(produce(draft => {
    draft.entities.playlist.set(playlist._id, playlist);
  }));
};

export const deletePlaylist = async (id: string) => {
  await window.ipc.playlist.remove(id);

  store.set(produce(draft => {
    draft.entities.playlist.delete(id);
  }));
};
