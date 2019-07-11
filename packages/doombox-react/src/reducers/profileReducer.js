import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  CREATE_USER,
  GET_USER
} from '@doombox/utils/types/userTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

export const profileReducer = handleActions({
  [combineActions(
    asyncActionPending(CREATE_USER),
    asyncActionPending(GET_USER)
  )]: state => ({
    ...state,
    pending: true,
    error: null
  }),
  [combineActions(
    asyncActionSuccess(CREATE_USER),
    asyncActionSuccess(GET_USER)
  )]: (state, action) => ({
    ...state,
    pending: false,
    error: null,
    profile: action.payload
  }),
  [combineActions(
    asyncActionError(CREATE_USER),
    asyncActionError(GET_USER)
  )]: (state, action) => ({
    ...state,
    pending: false,
    error: action.payload
  })
}, {
  pending: false,
  error: null,
  profile: null
});
