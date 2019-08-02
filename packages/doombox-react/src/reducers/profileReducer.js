import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  actionPending,
  actionError,
  actionSuccess
} from '@doombox/utils/types/asyncTypes';
import {
  actionCreate,
  actionRead,
  actionUpdate,
  actionDelete
} from '@doombox/utils/types/crudTypes';
import {
  USER,
  USER_CACHE
} from '@doombox/utils/types';

const initialState = {
  pending: false,
  error: false,
  user: {}
};

export const profileReducer = handleActions({
  [combineActions(
    actionPending(actionCreate(USER)),
    actionPending(actionUpdate(USER)),
    actionPending(actionDelete(USER))
  )]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [combineActions(
    actionError(actionCreate(USER)),
    actionError(actionUpdate(USER)),
    actionError(actionDelete(USER))
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      error: action.payload
    }),
  [combineActions(
    actionSuccess(actionCreate(USER)),
    actionSuccess(actionUpdate(USER)),
    actionSuccess(actionRead(USER_CACHE))
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      user: action.payload
    }),
  [actionSuccess(actionDelete(USER))]: () => initialState
}, initialState);
