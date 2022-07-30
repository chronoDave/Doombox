import produce from 'immer';
import { Shape } from 'src/types';

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

export const mergeShape = <T extends Shape>(
  target: T,
  source: Shape
) => produce(target, (draft: T) => {
  Object.keys(draft)
    .forEach(key => {
      // @ts-ignore - We know each key is a key of T
      if (typeof draft[key] === typeof source[key]) draft[key] = source[key];
    });
});
