import store from '../store';

export const getSongs = () => Array.from(store.get().entities.song.keys());
