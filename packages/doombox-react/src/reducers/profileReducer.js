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
  READ,
  USER
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: null,
  user: null
};

export const profileReducer = handleActions({
  [createType([PENDING, READ, USER])]: state => ({
    ...state,
    pending: true,
    error: false
  }),
  [createType([SUCCESS, READ, USER])]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: false,
    user: payload
  }),
  [createType([ERROR, READ, USER])]: (state, { payload }) => ({
    ...state,
    pending: false,
    error: payload,
    user: null
  })
}, initialState);
