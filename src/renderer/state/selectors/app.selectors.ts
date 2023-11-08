import type { Thumb } from '../../../types/library';

import createSelector from '../../utils/createSelector';
import store from '../store';

export const thumbSelector = createSelector(store)(
  (size: Thumb, id?: string | null) => {
    const { thumbs } = store.get().app.directory;

    return (thumbs && id) ?
      new URL(`${id}x${size}.jpg`, `${thumbs}/`).href :
      'icons/icon_light.png';
  },
  (prev, cur) => prev.app.directory.thumbs !== cur.app.directory.thumbs
);
