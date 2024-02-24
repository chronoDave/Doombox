import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

import { MIN_WIDTH, MIN_HEIGHT } from '../../lib/const';

export type AppShape = Constrain<Json, {
  window: {
    width: number
    height: number
    x: number
    y: number
  }
}>;

const appShape: Readonly<AppShape> = {
  window: {
    width: MIN_WIDTH,
    height: MIN_HEIGHT,
    x: -1,
    y: -1
  }
};

export default appShape;
