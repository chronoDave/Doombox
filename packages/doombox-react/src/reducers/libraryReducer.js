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
} from '@doombox/utils/types/ipc';

const initialState = {
  pending: false,
  error: null,
  collection: null,
  scanning: false
};

export const libraryReducer = handleActions({
  [createType([PENDING, CREATE, LIBRARY])]:
    state => ({
      ...state,
      pending: true,
      error: null,
      scanning: true
    }),
  [createType([PENDING, READ, LIBRARY])]:
    state => ({
      ...state,
      pending: true,
      error: null
    }),
  [createType([ERROR, CREATE, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload,
      scanning: false
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
      collection: payload,
      scanning: false
    }),
  [createType([SUCCESS, READ, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      collection: payload
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
