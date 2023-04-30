import type { RendererShape } from '../../types/shapes/renderer.shape';

export default async (reducer: (state: RendererShape) => RendererShape) => {
  const cache = await window.ipc.cache.get();
  return window.ipc.cache.set(reducer(cache));
};
