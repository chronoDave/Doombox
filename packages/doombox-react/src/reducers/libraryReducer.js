import { handleActions } from 'redux-actions';

// Types
import {
  createType,
  LIBRARY,
  USER,
  CREATE,
  READ,
  DELETE,
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: false,
  collection: null,
};

export const libraryReducer = handleActions({
  [createType([PENDING, CREATE, LIBRARY])]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [createType([PENDING, READ, LIBRARY])]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [createType([ERROR, CREATE, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload
    }),
  [createType([ERROR, READ, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload
    }),
  [createType([SUCCESS, CREATE, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      collection: payload
    }),
  [createType([SUCCESS, READ, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      collection: payload
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
