import type { Subscriber } from '@doombox/lib/store/store';
import type { Component } from 'forgo';

import deepEqual from 'fast-deep-equal';

import Store from '@doombox/lib/store/store';

export default class RendererStore<S extends object> extends Store<S> {
  select<T>(
    selector: (state: S) => T,
    thunk?: {
      selector: (state: S) => Promise<T>,
      shouldUpdate: (cur: S, prev: S) => boolean
    }
  ) {
    let state = selector(this.state);

    return (component: Component): T => {
      const subscriber: Subscriber<S> = async (cur, prev) => {
        const updated = (
          thunk?.shouldUpdate(cur, prev) ||
          !deepEqual(selector(cur), selector(prev))
        );

        if (updated) {
          state = await thunk?.selector(cur) ?? selector(cur);
          component.update();
        }
      };

      component.unmount(() => this.off(subscriber));
      component.mount(async () => {
        this.on(subscriber);

        state = await thunk?.selector(this.state) ?? selector(this.state);
        component.update();
      });

      return state;
    };
  }
}
