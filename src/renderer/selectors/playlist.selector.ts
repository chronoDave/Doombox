import type Store from '../lib/store';
import type { State } from '../types/state';

export const getPlaylist = (store: Store<State>) =>
  () => store.get().playlist.songs;

export const getCurrent = (store: Store<State>) =>
  () => store.get().playlist.songs[store.get().playlist.index];
