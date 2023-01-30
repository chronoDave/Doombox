import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type AppShape = Constrain<Json, {
  window: {
    width: number
    height: number
    x: number
    y: number
  },
  player: {
    volume: number,
    muted: boolean
  }
}>;

const appShape: Readonly<AppShape> = {
  window: {
    width: 320,
    height: 240,
    x: -1,
    y: -1
  },
  player: {
    volume: 1,
    muted: false
  }
};

export default appShape;
