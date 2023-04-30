import createMapSelector from '../../utils/createMapSelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const albumsSelector =
  createMapSelector(store)(state => state.entities.album);

export const albumSelector = createSelector(store)(
  (id: string) => {
    const album = store.get().entities.album.get(id);

    if (!album) throw new Error(`Invalid id: ${id}`);
    return album;
  },
  () => false
);
