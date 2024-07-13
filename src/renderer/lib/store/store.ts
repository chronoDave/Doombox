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

        console.log(cur, prev);
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
}
