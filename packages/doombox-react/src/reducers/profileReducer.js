import {
  handleActions,
  combineActions
} from 'redux-actions';

// Types
import {
  createType,
  PENDING,
  ERROR,
  USER,
  REMOTE,
  CREATE,
  READ,
  UPDATE,
  DELETE,
  SUCCESS
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: null,
  user: null
};

export const profileReducer = handleActions({
  [combineActions(
    createType([ERROR, READ, REMOTE]),
    createType([ERROR, READ, USER])
  )]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload,
      user: null
    }),
  [combineActions(
    createType([SUCCESS, READ, REMOTE]),
    createType([SUCCESS, READ, USER])
  )]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: null,
      user: payload
    }),
  [combineActions(
    createType([PENDING, UPDATE, USER]),
    createType([PENDING, DELETE, USER])
  )]:
    state => ({
      ...state,
      pending: true,
      error: null
    }),
  [combineActions(
    createType([ERROR, UPDATE, USER]),
    createType([ERROR, DELETE, USER])
  )]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload
    }),
  [combineActions(
    createType([SUCCESS, UPDATE, USER]),
    createType([SUCCESS, CREATE, USER])
  )]:
    (state, { payload }) => ({
      ...state,
      error: null,
      pending: false,
      user: payload
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
