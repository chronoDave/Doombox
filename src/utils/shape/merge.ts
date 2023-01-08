import produce from 'immer';
import merge from 'lodash.merge';

export default <T>(target: T, source: Partial<T>) =>
  produce(target, draft => {
    merge(draft, source);
  });
