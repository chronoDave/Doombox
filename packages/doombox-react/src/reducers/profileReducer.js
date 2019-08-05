import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types/asyncTypes';
import {
  CREATE,
  READ,
  UPDATE,
  DELETE
} from '@doombox/utils/types/crudTypes';
import {
  create,
  USER,
  USER_CACHE
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: false,
  user: {}
};

export const profileReducer = handleActions({
  [combineActions(
    create([PENDING, CREATE, USER]),
    create([PENDING, UPDATE, USER]),
    create([PENDING, DELETE, USER])
  )]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [combineActions(
    create([ERROR, CREATE, USER]),
    create([ERROR, UPDATE, USER]),
    create([ERROR, DELETE, USER])
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      error: action.payload
    }),
  [combineActions(
    create([SUCCESS, CREATE, USER]),
    create([SUCCESS, READ, USER_CACHE]),
    create([SUCCESS, UPDATE, USER])
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      user: action.payload
    }),
  [create([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
