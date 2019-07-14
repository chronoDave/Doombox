import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
  GET_USER_CACHE
} from '@doombox/utils/types/userTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const initialState = {
  pending: false,
  error: null,
  cache: false,
  user: {}
};

export const profileReducer = handleActions({
  [combineActions(
    asyncActionPending(CREATE_USER),
    asyncActionPending(DELETE_USER),
    asyncActionPending(GET_USER_CACHE),
    asyncActionPending(UPDATE_USER),
  )]: state => ({
    ...state,
    pending: true,
    error: null
  }),
  [combineActions(
    asyncActionSuccess(CREATE_USER),
    asyncActionSuccess(UPDATE_USER),
    asyncActionSuccess(GET_USER_CACHE)
  )]: (state, action) => ({
    ...state,
    pending: false,
    error: null,
    user: action.payload,
    cache: true
  }),
  [asyncActionSuccess(DELETE_USER)]: () => initialState,
  [combineActions(
    asyncActionError(CREATE_USER),
    asyncActionError(UPDATE_USER),
    asyncActionError(DELETE_USER)
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      error: action.payload
    }),
  [asyncActionError(GET_USER_CACHE)]:
    state => ({
      ...state,
      pending: false,
      cache: false
    })
}, initialState);
