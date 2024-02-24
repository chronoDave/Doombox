import type { Shape } from '../../types/primitives';

import isShape from '../validation/isShape';

export default <T extends Shape = Shape>(x: string) => {
  try {
    const json = JSON.parse(x);
    return isShape<T>(json) ?
      json :
      null;
  } catch (err) {
    return null;
  }
};
