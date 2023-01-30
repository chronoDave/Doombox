import type { UserShape } from '../../../types/shapes/user.shape';
import type { State } from '../types';

import produce from 'immer';

import createSlice from '../../lib/state/createSlice';

export default createSlice<State>('user')({
  setUser: (user: UserShape) => produce(draft => {
    draft.user = user;
  })
});
