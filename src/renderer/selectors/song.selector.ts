import type Store from '../lib/store';
import type { State } from '../types/state';

export const getSongs = (store: Store<State>) => () => Array.from(store.get().entities.song.keys());

export const getSong = (store: Store<State>) => (id: string) => {
  const song = store.get().entities.song.get(id);

  if (!song) throw new Error(`Invalid id: ${id}`);
  return song;
};
