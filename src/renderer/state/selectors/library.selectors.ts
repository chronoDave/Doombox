import store from '../store';

export const getSong = (id: string) => {
  const { library } = store.get();
  const song = library.songs.map.get(id);

  if (!song) throw new Error(`Invalid id: ${id}`);
  return song;
};
