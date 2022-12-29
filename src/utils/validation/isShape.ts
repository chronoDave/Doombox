import type { Shape } from '../../types/primitives';

import isObject from './isObject';
import isJSON from './isJSON';

export default (x: unknown): x is Shape =>
  isObject(x) &&
  Object.values(x).every(isJSON);
