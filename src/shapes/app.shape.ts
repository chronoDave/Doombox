import type { Constrain } from '../types/helpers';
import type { Json } from '../types/primitives';

export type AppShape = Constrain<Json, {
  window: {
    width: number
    height: number
    x?: number
    y?: number
  }
}>;

const appShape: Readonly<AppShape> = {
  window: {
    width: 320,
    height: 240
  }
};

export default appShape;
