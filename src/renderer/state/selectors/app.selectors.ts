import type { Thumb } from '../../../types/library';

import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const readySelector =
  createPropertySelector(store)(state => state.app.ready);

export const scanningSelector =
  createPropertySelector(store)(state => state.app.scanning);

export const thumbSelector = createSelector(store)(
  (id: string | null, size: Thumb) => {
    const { thumbs } = store.get().app.directory;

    return (thumbs && id) ?
      new URL(`${id}x${size}.jpg`, `${thumbs}/`).href :
      'icons/icon_light.png';
  },
  (prev, cur) => prev.app.directory.thumbs !== cur.app.directory.thumbs
);
