import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type UserShape = Constrain<Json, {
  scanner: {
    romaji: boolean
  }
  library: {
    folders: string[]
  },
  player: {
    autoplay: boolean,
    loop: boolean
  }
}>;

const userShape: Readonly<UserShape> = {
  scanner: {
    romaji: true
  },
  library: {
    folders: []
  },
  player: {
    autoplay: true,
    loop: true
  }
};

export default userShape;
