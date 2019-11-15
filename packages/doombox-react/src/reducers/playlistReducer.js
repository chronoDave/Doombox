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
  UPDATE,
  DELETE,
  PLAYLIST
} from '@doombox/utils/types/ipc';

// Utils
import { REDUCER } from '../utils/const';

const initialState = {
  pending: false,
  error: null,
  collection: [],
  current: null,
  scanning: false
};

export const playlistReducer = handleActions({
  [combineActions(
    createType([PENDING, CREATE, PLAYLIST]),
    createType([PENDING, READ, PLAYLIST]),
    createType([PENDING, UPDATE, PLAYLIST]),
    createType([PENDING, DELETE, PLAYLIST])
  )]: state => ({
    ...state,
    pending: true,
    error: null
  }),
  [combineActions(
    createType([ERROR, CREATE, PLAYLIST]),
    createType([ERROR, READ, PLAYLIST]),
    createType([ERROR, UPDATE, PLAYLIST]),
    createType([ERROR, DELETE, PLAYLIST])
  )]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: payload
  }),
  [createType([SUCCESS, CREATE, PLAYLIST])]: (state, { payload }) => ({
    ...state,
    pending: false,
    collection: [...state.collection, payload]
  }),
  [createType([SUCCESS, READ, PLAYLIST])]: (state, { payload }) => ({
    ...state,
    pending: false,
    collection: payload
  }),
  [createType([SUCCESS, UPDATE, PLAYLIST])]: (state, { payload }) => ({
    ...state,
    pending: false,
    collection: [
      ...state.collection.filter(playlist => playlist === payload._id),
      payload
    ]
  }),
  [createType([SUCCESS, DELETE, PLAYLIST])]: (state => ({
    ...state,
    pending: false
  })),
  [REDUCER.SET_PLAYLIST_CURRENT]: (state, { payload }) => ({
    ...state,
    current: payload
  })
}, initialState);
