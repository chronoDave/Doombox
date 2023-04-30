import type Store from '../lib/store';
import type { State } from '../types/state';

export const getAlbums = (store: Store<State>) =>
  () => Array.from(store.get().entities.album.keys());

export const getAlbum = (store: Store<State>) =>
  (id: string) => {
    const album = store.get().entities.album.get(id);

    if (!album) throw new Error(`Invalid id: ${id}`);
    return album;
  };
