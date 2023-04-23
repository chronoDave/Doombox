import store from '../store';

export const getPlaylist = () => store.get().playlist.songs;

export const getCurrent = () => store.get().playlist.songs[store.get().playlist.index];
