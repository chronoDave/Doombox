import store from '../store';

export default () => Array.from(store.get().library.songs.values());
