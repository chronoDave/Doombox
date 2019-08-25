import {
  combineActions,
  handleActions
} from 'redux-actions';

// Types
import {
  create,
  USER_CACHE,
  USER,
  CREATE,
  READ,
  DELETE,
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types';

const initialState = {
  connected: false,
  pending: false,
  error: null
};

export const systemReducer = handleActions({
  [create([PENDING, READ, USER_CACHE])]:
    state => ({
      ...state,
      pending: true
    }),
  [combineActions(
    create([ERROR, READ, USER_CACHE]),
    create([PENDING, DELETE, USER])
  )]: () => initialState,
  [combineActions(
    create([SUCCESS, READ, USER_CACHE]),
    create([SUCCESS, CREATE, USER])
  )]:
    state => ({
      ...state,
      pending: false,
      connected: true
    }),
}, initialState);
