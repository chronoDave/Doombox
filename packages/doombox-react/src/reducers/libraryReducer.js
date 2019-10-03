import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  createType,
  LIBRARY,
  USER,
  CREATE,
  READ,
  DELETE,
  PENDING,
  COLLECTION,
  ERROR,
  SUCCESS
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: false,
  scanning: false,
  collection: null,
  grouped: null
};

export const libraryReducer = handleActions({
  [createType([PENDING, CREATE, LIBRARY])]:
    state => ({
      ...state,
      pending: true,
      scanning: true,
      error: false
    }),
  [combineActions(
    createType([PENDING, READ, LIBRARY]),
    createType([PENDING, READ, COLLECTION])
  )]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [createType([ERROR, CREATE, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      scanning: false,
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
      scanning: false,
      collection: payload
    }),
  [createType([SUCCESS, READ, LIBRARY])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      collection: payload
    }),
  [createType([SUCCESS, READ, COLLECTION])]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      grouped: payload
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
