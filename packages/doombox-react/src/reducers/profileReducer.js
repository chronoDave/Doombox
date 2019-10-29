import {
  handleActions,
  combineActions
} from 'redux-actions';

// Types
import {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  CREATE,
  READ,
  UPDATE,
  DELETE,
  USER
} from '@doombox/utils/types/ipc';

const initialState = {
  pending: false,
  error: null,
  user: null
};

export const profileReducer = handleActions({
  [combineActions(
    createType([PENDING, CREATE, USER]),
    createType([PENDING, READ, USER]),
    createType([PENDING, UPDATE, USER]),
    createType([PENDING, DELETE, USER])
  )]: state => ({
    ...state,
    pending: true,
    error: false
  }),
  [combineActions(
    createType([SUCCESS, CREATE, USER]),
    createType([SUCCESS, READ, USER]),
    createType([SUCCESS, UPDATE, USER])
  )]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: false,
    user: payload
  }),
  [combineActions(
    createType([ERROR, CREATE, USER]),
    createType([ERROR, READ, USER]),
    createType([ERROR, UPDATE, USER]),
    createType([ERROR, DELETE, USER])
  )]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: payload,
    user: null
  }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
