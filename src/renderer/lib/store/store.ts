import type { Subscriber } from '@doombox/lib/store/store';
import type { Component } from 'forgo';

import deepEqual from 'fast-deep-equal';

import Store from '@doombox/lib/store/store';

export default class RendererStore<S extends object> extends Store<S> {
  select<T>(
    selector: (state: S) => T,
    shouldUpdate?: (cur: S, next: S) => boolean
  ) {
    return (id: string, component: Component): T => {
      const subscriber: Subscriber<S> = (cur, prev) => {
        // console.time(`[shouldUpdate] ${id}`);
        // console.log(cur, next);
        const updated =
          shouldUpdate?.(cur, prev) ||
          !deepEqual(selector(cur), selector(prev));
        // console.timeEnd(`[shouldUpdate] ${id}`);

        // console.log(cur, prev);
        if (updated) {
          // console.log(`[update] ${id}`);
          component.update();
        }
      };

      component.mount(() => this.on(subscriber));
      component.unmount(() => this.off(subscriber));

      return selector(this.state);
    };
  }

  selectAsync<T>(
    initial: T,
    selector: (state: S) => Promise<T>,
    shouldUpdate?: (cur: S, next: S) => boolean
  ) {
    let state = initial;

    return (component: Component): T => {
      const subscriber: Subscriber<S> = async (cur, prev) => {
        const [x, y] = await Promise.all([cur, prev].map(selector));
        const updated = shouldUpdate?.(cur, prev) || !deepEqual(x, y);

        if (updated) {
          state = x;
          component.update();
        }
      };

      component.mount(async () => {
        this.on(subscriber);

        state = await selector(this.state);
        component.update();
      });
      component.unmount(() => this.off(subscriber));

      return state;
    };
  }
}
