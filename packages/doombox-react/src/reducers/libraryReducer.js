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
  ERROR,
  SUCCESS
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: false,
  collection: []
};

export const libraryReducer = handleActions({
  [combineActions(
    createType([PENDING, CREATE, LIBRARY]),
    createType([PENDING, READ, LIBRARY])
  )]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [combineActions(
    createType([ERROR, CREATE, LIBRARY]),
    createType([ERROR, READ, LIBRARY])
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      error: action.payload
    }),
  [combineActions(
    createType([SUCCESS, CREATE, LIBRARY]),
    createType([SUCCESS, READ, LIBRARY])
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      collection: action.payload
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
