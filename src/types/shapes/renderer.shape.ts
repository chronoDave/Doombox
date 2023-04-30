import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

import { AppView } from '../views';

export type RendererShape = Constrain<Json, {
  tab: AppView,
  player: {
    volume: number,
    muted: boolean
  }
}>;

const rendererShape: Readonly<RendererShape> = {
  tab: AppView.Player,
  player: {
    volume: 1,
    muted: false
  }
};

export default rendererShape;
