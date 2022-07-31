import type { Constrain, Json } from '../types';

export type ShapeApp = Constrain<Json, {
  window: {
    width: number
    height: number
    x?: number
    y?: number
  }
}>;

const shape: Readonly<ShapeApp> = {
  window: {
    width: 320,
    height: 240
  }
};

export default shape;
