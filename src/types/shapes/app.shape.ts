import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type AppShape = Constrain<Json, {
  library: {
    folders: string[]
  }
  window: {
    width: number
    height: number
    x: number
    y: number
  }
}>;

const appShape: Readonly<AppShape> = {
  library: {
    folders: []
  },
  window: {
    width: 320,
    height: 240,
    x: -1,
    y: -1
  }
};

export default appShape;
