import type { Constrain } from '../helpers';
import type { Json } from '../primitives';
import type { RomajiSystem } from 'kuroshiro';

export type UserShape = Constrain<Json, {
  scanner: {
    romaji: {
      enabled: boolean
      system: RomajiSystem
    }
  }
  library: {
    folders: string[]
  },
  player: {
    autoplay: boolean
  }
}>;

const userShape: Readonly<UserShape> = {
  scanner: {
    romaji: {
      enabled: true,
      system: 'hepburn'
    }
  },
  library: {
    folders: []
  },
  player: {
    autoplay: true
  }
};

export default userShape;
