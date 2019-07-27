import { handleActions } from 'redux-actions';

// Types
import {
  CREATE_USER,
  DELETE_USER
} from '@doombox/utils/types/userTypes';
import {
  CREATE_CONNECTION,
  GET_CONNECTION_CACHE
} from '@doombox/utils/types/systemTypes';
import {
  asyncActionPending,
  asyncActionSuccess,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const initialState = {
  connectedCache: false,
  connectedDatabase: false,
  error: false,
  pendingCache: false,
  pendingDatabase: false
};

export const systemReducer = handleActions({
  [asyncActionSuccess(CREATE_USER)]:
    state => ({
      ...state,
      connectedCache: true
    }),
  [asyncActionSuccess(DELETE_USER)]:
    state => ({
      ...state,
      connectedCache: false,
      connectedDatabase: false
    }),
  [asyncActionPending(GET_CONNECTION_CACHE)]:
    state => ({
      ...state,
      connectedCache: false,
      error: false,
      pendingCache: true
    }),
  [asyncActionSuccess(GET_CONNECTION_CACHE)]:
    state => ({
      ...state,
      connectedCache: true,
      connectedDatabase: true,
      error: false,
      pendingCache: false
    }),
  [asyncActionError(GET_CONNECTION_CACHE)]:
    (state, action) => ({
      ...state,
      connectedCache: false,
      error: action.payload,
      pendingCache: false
    }),
  [asyncActionPending(CREATE_CONNECTION)]:
    state => ({
      ...state,
      connectedDatabase: false,
      error: false,
      pendingDatabase: true
    }),
  [asyncActionSuccess(CREATE_CONNECTION)]:
    state => ({
      ...state,
      connectedDatabase: true,
      error: false,
      pendingDatabase: false
    }),
  [asyncActionError(CREATE_CONNECTION)]:
    (state, action) => ({
      ...state,
      connectedDatabase: false,
      error: action.payload,
      pendingDatabase: false
    })
}, initialState);
