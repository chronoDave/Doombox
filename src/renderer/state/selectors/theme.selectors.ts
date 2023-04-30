import deepEqual from 'fast-deep-equal';

import createPropertySelector from '../../utils/createPropertySelector';
import createSelector from '../../utils/createSelector';
import store from '../store';

export const themeSelector =
  createPropertySelector(store)(state => state.theme.theme);

export const themePlayerSelector = createSelector(store)(
  () => store.get().theme.player,
  (prev, cur) => !deepEqual(prev, cur)
);
