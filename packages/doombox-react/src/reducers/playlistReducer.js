import {
  handleActions,
  combineActions
} from 'redux-actions';

// Types
import {
  createType,
  PENDING,
  ERROR,
  SUCCESS,
  CREATE,
  READ,
  PLAYLIST
} from '@doombox/utils/types/ipc';

const initialState = {
  pending: false,
  error: null,
  collection: []
};

export const playlistReducer = handleActions({
  [combineActions(
    createType([PENDING, CREATE, PLAYLIST]),
    createType([PENDING, READ, PLAYLIST])
  )]: state => ({
    ...state,
    pending: true,
    error: null
  }),
  [combineActions(
    createType([ERROR, CREATE, PLAYLIST]),
    createType([ERROR, READ, PLAYLIST])
  )]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: payload
  }),
  [createType([SUCCESS, READ, PLAYLIST])]: (state, { payload }) => ({
    ...state,
    pending: false,
    collection: payload
  }),
  [createType([SUCCESS, CREATE, PLAYLIST])]: (state, { payload }) => ({
    ...state,
    pending: false,
    collection: [...state.collection, payload]
  })
}, initialState);
