import type { Subscriber } from '@doombox/lib/store/store';
import type { Component } from 'forgo';

import deepEqual from 'fast-deep-equal';

import Store from '@doombox/lib/store/store';

export default class RendererStore<S extends object> extends Store<S> {
  select<T>(
    selector: (state: S) => T,
    thunk?: (state: S) => Promise<T>
  ) {
    let state = selector(this.state);

    return (component: Component): T => {
      const subscriber: Subscriber<S> = async (x, y) => {
        const [cur, prev] = await Promise.all([x, y].map(s => thunk?.(s) ?? selector(s)));
        const updated = !deepEqual(cur, prev);

        if (updated) {
          state = cur;
          component.update();
        }
      };

      component.unmount(() => this.off(subscriber));
      component.mount(async () => {
        this.on(subscriber);

        state = await thunk?.(this.state) ?? selector(this.state);
        component.update();
      });

      return state;
    };
  }
}
