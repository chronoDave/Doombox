import store from '../store';

export const getSong = (id: string) => {
  const { library } = store.get();
  return library.songs.map.get(id) ?? null;
};
