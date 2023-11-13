import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

import { AppView } from '../views';

export type CacheShape = Constrain<Json, {
  tab: AppView,
  player: {
    volume: number,
    muted: boolean
  }
}>;

const cacheShape: Readonly<CacheShape> = {
  tab: AppView.Album,
  player: {
    volume: 1,
    muted: false
  }
};

export default cacheShape;
