import type { Album } from '../../../../types/library';

import { currentPlayerSelector, thumbSelector } from '../../../selectors';
import store from '../../../store';
import createSelector from '../../../utils/createSelector';

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
        .sort((a, b) => {
          if (!a.year || !b.year) return 0;
          if (a.year !== b.year) return a.year - b.year;
          if (!a.cdid || !b.cdid) return 0;
          if (a.cdid !== b.cdid) a.cdid.localeCompare(b.cdid);
          if (!a.album || !b.album) return 0;
          return a.album.localeCompare(b.album);
        })
    })
  );

  return ({ labels, current: currentPlayerSelector(state)()?.album });
});
