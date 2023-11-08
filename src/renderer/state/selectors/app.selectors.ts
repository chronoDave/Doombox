import type { Thumb } from '../../../types/library';

import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const readySelector =
  createPropertySelector(store)(state => state.app.ready);

export const scanningSelector =
  createPropertySelector(store)(state => state.app.scanning);

export const settingsSelector =
  createPropertySelector(store)(state => state.app.settings);

export const thumbSelector = createSelector(store)(
  (size: Thumb, id?: string | null) => {
    const { thumbs } = store.get().app.directory;

    return (thumbs && id) ?
      new URL(`${id}x${size}.jpg`, `${thumbs}/`).href :
      'icons/icon_light.png';
  },
  (prev, cur) => prev.app.directory.thumbs !== cur.app.directory.thumbs
);
