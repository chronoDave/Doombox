import createMapSelector from '../../utils/createMapSelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const songsSelector =
  createMapSelector(store)(state => state.entities.song);

export const songSelector = createSelector(store)(
  (id: string) => {
    const song = store.get().entities.song.get(id);

    if (!song) throw new Error(`Invalid id: ${id}`);
    return song;
  },
  () => false
);