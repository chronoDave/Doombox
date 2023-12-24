import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type CacheShape = Constrain<Json, {
  player: {
    volume: number,
    muted: boolean
  }
}>;

const cacheShape: Readonly<CacheShape> = {
  player: {
    volume: 1,
    muted: false
  }
};

export default cacheShape;
