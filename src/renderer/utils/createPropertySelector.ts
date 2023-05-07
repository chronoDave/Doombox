import type Store from '../lib/store';
import type { State } from '../types/state';

import createSelector from './createSelector';

export default (store: Store<State>) =>
  <T extends number | string | boolean | null | undefined>(property: (state: State) => T) =>
    createSelector(store)(
      () => property(store.get()),
      (prev, cur) => property(prev) !== property(cur)
    );
