import store from '../store';

export const getSong = (id: string) => {
  const { library } = store.get();
  return library.songs.get(id) ?? null;
};

export const getSongs = () =>
  Array.from(store.get().library.songs.values());
