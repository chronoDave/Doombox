import type Store from '../lib/store';
import type { State } from '../types/state';
import type { Component } from 'forgo';

import deepEqual from 'fast-deep-equal';

const createSelector = <S extends State>(store: Store<S>) =>
  <T extends (state: S) => any>(get: T, shouldUpdate?: (prev: S, cur: S) => boolean) =>
    (component: Component): ReturnType<T> => {
      const listener = (prev: S, cur: S) => (
        shouldUpdate?.(prev, cur) ||
        !deepEqual(get(prev), get(cur))
      ) && component.update();

      component.mount(() => store.subscribe(listener));
      component.unmount(() => store.unsubscribe(listener));

      return get(store.get());
    };

export default createSelector;
