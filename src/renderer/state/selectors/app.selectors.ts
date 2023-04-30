import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const readySelector =
  createPropertySelector(store)(state => state.app.ready);

export const scanningSelector =
  createPropertySelector(store)(state => state.app.scanning);

export const thumbSelector = createSelector(store)(
  (id: string | null) => {
    const root = store.get().app.path.thumb;

    if (!id) return 'icons/icon_light.png';
    return new URL(`${id}.jpg`, `${root}/`).href;
  },
  (prev, cur) => prev.app.path.thumb !== cur.app.path.thumb
);

export const coverSelector = createSelector(store)(
  (id: string | null) => {
    const root = store.get().app.path.cover;

    if (!id) return 'icons/icon_light.png';
    return new URL(`${id}.jpg`, `${root}/`).href;
  },
  (prev, cur) => prev.app.path.cover !== cur.app.path.cover
);
