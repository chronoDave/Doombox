import type { UserShape } from '../../../types/shapes/user.shape';

import { getUser } from '../../ipc/user';
import createSlice from '../../utils/createSlice';

export type UserState = {
  shape: UserShape
};

export default (state: UserState) => createSlice({
  fetchUser: async () => {
    state.shape = await getUser();
  }
}, 'user');
