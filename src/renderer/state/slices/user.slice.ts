import type { UserShape } from '../../../types/shapes/user.shape';

import { getUser } from '../../ipc/user';

export type UserSlice = {
  shape: UserShape
};

export default (slice: UserSlice) => ({
  fetchUser: async () => {
    slice.shape = await getUser();
  }
});
