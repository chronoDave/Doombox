import { handleActions } from 'redux-actions';

// Types
import {
  CONNECTION_CACHE,
  USER_CACHE,
  USER
} from '@doombox/utils/types';
import {
  actionCreate,
  actionDelete,
  actionRead
} from '@doombox/utils/types/crudTypes';
import {
  actionPending,
  actionError,
  actionSuccess
} from '@doombox/utils/types/asyncTypes';

const initialState = {
  connectedCache: false,
  connectedDatabase: false,
  error: false,
  pendingCache: false,
  pendingDatabase: false
};

export const systemReducer = handleActions({
  [actionPending(actionRead(CONNECTION_CACHE))]:
    state => ({
      ...state,
      pendingCache: true
    }),
  [actionError(actionRead(CONNECTION_CACHE))]:
    state => ({
      ...state,
      pendingCache: false
    }),
  [actionSuccess(actionRead(CONNECTION_CACHE))]:
    state => ({
      ...state,
      pendingCache: false,
      connectedCache: true
    }),
  [actionSuccess(actionRead(USER_CACHE))]:
    state => ({
      ...state,
      connectedDatabase: true
    }),
  [actionSuccess(actionCreate(USER))]:
    state => ({
      ...state,
      connectedCache: true,
      connectedDatabase: true
    }),
  [actionSuccess(actionDelete(USER))]: () => initialState
}, initialState);
