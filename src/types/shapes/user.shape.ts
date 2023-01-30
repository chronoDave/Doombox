import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type UserShape = Constrain<Json, {
  library: {
    folders: string[]
  },
  player: {
    autoplay: boolean
  }
}>;

const userShape: Readonly<UserShape> = {
  library: {
    folders: []
  },
  player: {
    autoplay: true
  }
};

export default userShape;
