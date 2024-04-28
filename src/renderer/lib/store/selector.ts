import type Store from './store';
import type { Component } from 'forgo';

import deepEqual from 'fast-deep-equal';

const createSelector = <S extends Record<string, unknown>>(store: Store<S>, id: string) =>
  <T extends (state: S) => any>(get: T, shouldUpdate?: (prev: S, cur: S) => boolean) =>
    (component: Component): ReturnType<T> => {
      const listener = (prev: S, cur: S) => (
        shouldUpdate?.(prev, cur) ||
        !deepEqual(get(prev), get(cur))
      ) && component.update();

      component.mount(() => store.subscribe(listener));
      component.unmount(() => store.unsubscribe(listener));

      console.log(id);
      return get(store.get());
    };

export default createSelector;
