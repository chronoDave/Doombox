import {
  handleActions,
  combineActions
} from 'redux-actions';

// Types
import {
  createType,
  PENDING,
  SUCCESS,
  CONNECTION,
  DELETE,
  ERROR,
  CREATE,
  READ,
  CACHE,
  REMOTE,
  USER
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: null,
  cache: false,
  connection: false,
  remote: false,
};

export const systemReducer = handleActions({
  [createType([PENDING, READ, CACHE])]:
    state => ({
      ...state,
      pending: true,
      error: null
    }),
  [createType([ERROR, READ, CACHE])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload
    }),
  [createType([ERROR, READ, CONNECTION])]:
    (state, { payload }) => ({
      ...state,
      cache: true,
      remote: true,
      pending: false,
      error: payload
    }),
  [createType([ERROR, READ, REMOTE])]:
    (state, { payload }) => ({
      ...state,
      cache: true,
      remote: true,
      connection: true,
      pending: false,
      error: payload
    }),
  [createType([ERROR, READ, USER])]:
    (state, { payload }) => ({
      ...state,
      cache: true,
      pending: false,
      error: payload
    }),
  [createType([SUCCESS, READ, REMOTE])]:
    state => ({
      ...state,
      pending: false,
      cache: true,
      remote: true,
      connection: true
    }),
  [combineActions(
    createType([SUCCESS, READ, USER]),
    createType([SUCCESS, CREATE, USER])
  )]:
    state => ({
      ...state,
      error: null,
      pending: false,
      cache: true
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState,
}, initialState);
