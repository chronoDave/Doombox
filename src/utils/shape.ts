import type { Shape } from '../types/primitives';

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

export const getShape = (x: Shape, path: string): unknown => {
  const keys = path.split('.');

  while (keys.length > 0) {
    const key = keys.shift();

    try {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      if (key) x = x[key];
    } catch (err) {
      return null;
    }
  }

  return x;
};
