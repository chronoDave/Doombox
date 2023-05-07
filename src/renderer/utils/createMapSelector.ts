import type Store from '../lib/store';
import type { State } from '../types/state';

import deepEqual from 'fast-deep-equal';

import createSelector from './createSelector';

export default (store: Store<State>) =>
  <T extends Map<string, unknown>>(selector: (state: State) => T) =>
    createSelector(store)(
      () => Array.from(selector(store.get()).keys()),
      (prevState, curState) => {
        const prev = selector(prevState);
        const cur = selector(curState);

        if (!prev || prev.size !== cur.size) return true;

        const keys = Array.from(cur.keys());
        for (let i = 0; i < keys.length; i += 1) {
          if (!deepEqual(prev.get(keys[i]), cur.get(keys[i]))) return true;
        }

        return false;
      }
    );
