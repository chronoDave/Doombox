import type Store from '../lib/store';
import type { State } from '../types/state';

export const getSongs = (store: Store<State>) => () => Array.from(store.get().entities.song.keys());

export const getSong = (store: Store<State>) => (id: string) => {
  const song = store.get().entities.song.get(id);

  if (!song) throw new Error(`Invalid id: ${id}`);
  return song;
};

export const getCover = (store: Store<State>) =>
  (id: string | null) => id ?
    new URL(`${id}.jpg`, `${store.get().app.path.cover}/`).href :
    'icons/icon_light.png';

export const getThumb = (store: Store<State>) =>
  (id: string | null) => id ?
    new URL(`${id}.jpg`, `${store.get().app.path.thumb}/`).href :
    'icons/icon_light.png';
