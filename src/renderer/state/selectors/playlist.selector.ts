import store from '../store';

export const getPlaylist = () => store.get().playlist.songs;
