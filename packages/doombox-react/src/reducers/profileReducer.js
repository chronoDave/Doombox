import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  UPDATE_USER,
  CREATE_USER,
  GET_USER_CACHE
} from '@doombox/utils/types/userTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

export const profileReducer = handleActions({
  [combineActions(
    asyncActionPending(CREATE_USER),
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
  [combineActions(
    asyncActionError(CREATE_USER),
    asyncActionError(UPDATE_USER)
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
}, {
  pending: false,
  error: null,
  cache: false,
  user: {},
  background: {}
});
