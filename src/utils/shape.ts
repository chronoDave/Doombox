import type { Shape } from '../types/primitives';

import produce from 'immer';

import { isShape } from './validation';

export const parseShape = (x: string) => {
  try {
    const json = JSON.parse(x);
    return isShape(json) ?
      json :
      null;
  } catch (err) {
    return null;
  }
};

export const mergeShape = <T>(target: T, source: Shape): T =>
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
