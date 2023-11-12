import type { Playlist } from '../../types/playlist';

import produce from 'immer';

import store from '../store';

const dispatchPlaylists = (playlists: Playlist[]) => store.dispatch(produce(draft => {
  draft.entities.playlist = new Map(playlists.map(playlist => [playlist._id, playlist]));
}), 'playlist.dispatchPlaylists');

export const fetchPlaylists = async () => {
  const playlists = await window.ipc.playlist.get();
  dispatchPlaylists(playlists);
};

export const createPlaylist = async (songs: string[]) => {
  const playlist = await window.ipc.playlist.add(songs);

  store.dispatch(produce(draft => {
    draft.entities.playlist.set(playlist._id, playlist);
  }), 'playlist.createPlaylist');
};

export const updatePlaylist = async (playlist: Playlist) => {
  await window.ipc.playlist.update(playlist);

  store.dispatch(produce(draft => {
    draft.entities.playlist.set(playlist._id, playlist);
  }), 'playlist.updatePlaylist');
};

export const deletePlaylist = async (id: string) => {
  await window.ipc.playlist.remove(id);

  store.dispatch(produce(draft => {
    draft.entities.playlist.delete(id);
  }), 'playlist.deletePlaylist');
};
