import type { Shape } from '../../types/primitives';

import produce from 'immer';
import merge from 'lodash.merge';

export default <T extends Shape>(target: Readonly<T>, source: Shape): T =>
  produce(target, draft => {
    merge(draft, source);
  });
