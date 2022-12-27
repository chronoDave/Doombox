import type { Constrain } from '../helpers';
import type { Json } from '../primitives';

export type UserShape = Constrain<Json, {
  library: {
    folders: string[]
  }
}>;

const userShape: Readonly<UserShape> = {
  library: {
    folders: []
  }
};

export default userShape;
