import type Store from '../lib/store';
import type { State } from '../types/state';

import createSelector from './createSelector';

export default (store: Store<State>) =>
  <T extends unknown>(property: (state: State) => T[]) =>
    createSelector(store)(() => property(store.get()), (prev, cur) => (
      property(prev).length !== property(cur).length ||
      property(prev).some((x, i) => property(cur)[i] !== x)
    ));
