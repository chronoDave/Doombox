import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type RendererShape = Constrain<Json, {
  player: {
    volume: number,
    muted: boolean
  }
}>;

const rendererShape: Readonly<RendererShape> = {
  player: {
    volume: 1,
    muted: false
  }
};

export default rendererShape;
