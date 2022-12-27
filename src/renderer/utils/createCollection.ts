import type { Doc } from 'leaf-db';
import type { Collection } from '../../types/primitives';

export default <T extends Doc<{}>>(arr: T[]): Collection<T> => ({
  set: new Set(arr),
  map: new Map(arr.map(x => [x._id, x]))
});
