import deepEqual from 'fast-deep-equal';

import createSelector from '../../utils/createSelector';
import store from '../store';

export const userLibrarySelector = createSelector(store)(
  () => store.get().user.library,
  (prev, cur) => !deepEqual(prev, cur)
);
