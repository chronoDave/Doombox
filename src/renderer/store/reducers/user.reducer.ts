import type { UserShape } from '../../../types/shapes/user.shape';
import type { State } from '../state';

import produce from 'immer';

import combineReducers from '../utils/combineReducer';

export default combineReducers<State>('user')({
  setUser: (user: UserShape) => produce(draft => {
    draft.user = user;
  })
});
