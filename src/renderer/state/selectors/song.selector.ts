import store from '../store';

export const getSongs = () => Array.from(store.get().entities.song.keys());

export const getSong = (id: string) => {
  const song = store.get().entities.song.get(id);

  if (!song) throw new Error(`Invalid id: ${id}`);
  return song;
};

