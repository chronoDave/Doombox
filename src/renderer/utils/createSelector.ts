import type Store from '../lib/store';
import type { Component } from 'forgo';

const createSelector = <S extends Record<string, unknown>>(store: Store<S>) => <T extends Function>(
  get: T,
  shouldUpdate: (prev: S, cur: S) => boolean
) => ({
  get,
  shouldUpdate,
  subscribe: (component: Component) => {
    const listener = (prev: S, cur: S) => shouldUpdate(prev, cur) && component.update();

    component.mount(() => store.subscribe(listener));
    component.unmount(() => store.unsubscribe(listener));

    return component;
  }
});

export default createSelector;
