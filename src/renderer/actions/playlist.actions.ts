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
