import {
  handleActions
} from 'redux-actions';

// Types
import {
  createType,
  PENDING,
  SUCCESS,
  ERROR,
  READ,
  CACHE,
} from '@doombox/utils/types/ipc';

const initialState = {
  pending: false,
  error: null,
  cache: null,
  remote: null,
  isScanning: false
};

export const systemReducer = handleActions({
  [createType([PENDING, READ, CACHE])]: state => ({
    ...state,
    pending: true,
    error: null
  }),
  [createType([SUCCESS, READ, CACHE])]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: null,
    cache: payload
  }),
  [createType([ERROR, READ, CACHE])]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: payload,
    cache: null
  })
}, initialState);
