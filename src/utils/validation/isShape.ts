import type { Shape } from '../../types/primitives';

import isJSON from './isJSON';
import isObject from './isObject';

export default (x: unknown): x is Shape =>
  isObject(x) &&
  Object.values(x).every(isJSON);
