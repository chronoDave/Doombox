import type { UserShape } from '../../../types/shapes/user.shape';

import { getUser } from '../../ipc/user';

export type UserSlice = {
  shape: UserShape
};

export const fetchUser = async (slice: UserSlice) => {
  slice.shape = await getUser();
};
