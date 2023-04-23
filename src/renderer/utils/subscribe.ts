import type Store from '../lib/store';
import type { Component } from 'forgo';

const createSubscription = <S extends Record<string, unknown>>(store: Store<S>) =>
  (shouldUpdate: (prev: S, cur: S) => boolean) =>
    <T extends Component>(component: T) => {
      const listener = (prev: S, cur: S) => shouldUpdate(prev, cur) && component.update();

      component.mount(() => store.subscribe(listener));
      component.unmount(() => store.unsubscribe(listener));

      return component;
    };

export default createSubscription;
