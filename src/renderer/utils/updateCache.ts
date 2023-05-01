import type { CacheShape } from '../../types/shapes/cache.shape';

export default async (reducer: (state: CacheShape) => CacheShape) => {
  const cache = await window.ipc.cache.get();
  return window.ipc.cache.set(reducer(cache));
};
