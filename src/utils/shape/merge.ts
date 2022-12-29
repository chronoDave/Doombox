import type { Shape } from '../../types/primitives';

import produce from 'immer';

export default <T extends Shape>(target: Readonly<T>, source: Shape): T =>
  produce(target, draft => {
    const merge = (
      a: Record<string, unknown>,
      b: Record<string, unknown>
    ) => Object.keys(a).forEach(key => {
      if (typeof a[key] !== typeof b[key]) return;
      if (typeof a[key] === 'object') {
        // @ts-ignore
        merge(a[key], b[key]);
      } else {
        a[key] = b[key];
      }
    });

    // @ts-ignore
    merge(draft, source);
  });
