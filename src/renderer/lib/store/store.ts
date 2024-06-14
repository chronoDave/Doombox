import type { State, Subscriber } from '@doombox/lib/store/store';
import type { Component } from 'forgo';

import deepEqual from 'fast-deep-equal';

import Store from '@doombox/lib/store/store';

export default class RendererStore<S extends State> extends Store<S> {
  select<T>(
    selector: (state: S) => T,
    shouldUpdate?: (cur: S, next: S) => boolean
  ) {
    return (id: string, component: Component): T => {
      const subscriber: Subscriber<S> = (cur, next) => {
        console.time(`[shouldUpdate] ${id}`);
        console.log(cur, next);
        const updated =
          shouldUpdate?.(cur, next) ||
          !deepEqual(selector(cur), selector(next));
        console.timeEnd(`[shouldUpdate] ${id}`);

        if (updated) {
          console.log(`[update] ${id}`);
          component.update();
        }
      };

      component.mount(() => this.on(subscriber));
      component.unmount(() => this.off(subscriber));

      return selector(this._state);
    };
  }
}
