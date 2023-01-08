import type { Shape } from '../../types/primitives';

import isJSON from './isJSON';
import isObject from './isObject';

export default <T extends Shape = Shape>(x: unknown): x is T =>
  isObject(x) &&
  Object.values(x).every(isJSON);
