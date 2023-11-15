import type { Album } from '../../../../types/library';

import { currentPlayerSelector, thumbSelector } from '../../../selectors';
import store from '../../../store';
import createSelector from '../../../utils/createSelector';
import { sortAlbums } from '../../../utils/sort';

export default createSelector(store)(state => {
  const labels = Array.from(
    state.entities.label.values(),
    label => ({
      ...label,
      albums: label.albums
        .reduce<Array<Album & { image: string }>>((acc, cur) => {
          const album = state.entities.album.get(cur);
          if (!album) return acc;

          acc.push({
            ...album,
            image: thumbSelector(state)(album.image)
          });
          return acc;
        }, [])
        .sort(sortAlbums)
    })
  );

  return ({ labels, current: currentPlayerSelector(state)()?._id });
});
