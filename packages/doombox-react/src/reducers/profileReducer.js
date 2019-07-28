import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
  GET_USER_CACHE
} from '@doombox/utils/types/userTypes';
import { UPDATE_CONNECTION } from '@doombox/utils/types/systemTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const initialState = {
  pending: false,
  error: null,
  user: {}
};

export const profileReducer = handleActions({
  [combineActions(
    asyncActionPending(CREATE_USER),
    asyncActionPending(DELETE_USER),
    asyncActionPending(UPDATE_USER),
    asyncActionPending(GET_USER_CACHE)
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
    user: action.payload
  }),
  [asyncActionSuccess(DELETE_USER)]:
    () => initialState,
  [asyncActionSuccess(UPDATE_CONNECTION)]:
    (state, action) => ({
      ...state,
      user: action.payload
    }),
  [combineActions(
    asyncActionError(CREATE_USER),
    asyncActionError(UPDATE_USER),
    asyncActionError(DELETE_USER),
    asyncActionError(GET_USER_CACHE)
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      error: action.payload
    })
}, initialState);
