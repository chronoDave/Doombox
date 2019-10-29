import {
  handleActions,
  combineActions
} from 'redux-actions';

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
};

export const libraryReducer = handleActions({
  [combineActions(
    createType([PENDING, CREATE, LIBRARY]),
    createType([PENDING, READ, LIBRARY])
  )]:
    state => ({
      ...state,
      pending: true,
      error: null
    }),
  [combineActions(
    createType([ERROR, CREATE, LIBRARY]),
    createType([ERROR, READ, LIBRARY])
  )]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      error: payload
    }),
  [combineActions(
    createType([SUCCESS, CREATE, LIBRARY]),
    createType([SUCCESS, READ, LIBRARY])
  )]:
    (state, { payload }) => ({
      ...state,
      pending: false,
      collection: payload
    }),
  [createType([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
