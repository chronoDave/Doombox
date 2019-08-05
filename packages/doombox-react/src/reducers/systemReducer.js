import { handleActions } from 'redux-actions';

// Types
import {
  create,
  CONNECTION_CACHE,
  USER_CACHE,
  USER
} from '@doombox/utils/types';
import {
  CREATE,
  DELETE,
  READ
} from '@doombox/utils/types/crudTypes';
import {
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types/asyncTypes';

const initialState = {
  connectedCache: false,
  connectedDatabase: false,
  error: false,
  pendingCache: false,
  pendingDatabase: false
};

export const systemReducer = handleActions({
  [create([PENDING, READ, CONNECTION_CACHE])]:
    state => ({
      ...state,
      pendingCache: true
    }),
  [create([ERROR, READ, CONNECTION_CACHE])]:
    state => ({
      ...state,
      pendingCache: false
    }),
  [create([SUCCESS, READ, CONNECTION_CACHE])]:
    state => ({
      ...state,
      pendingCache: false,
      connectedCache: true
    }),
  [create([SUCCESS, READ, USER_CACHE])]:
    state => ({
      ...state,
      connectedDatabase: true
    }),
  [create([SUCCESS, CREATE, USER])]:
    state => ({
      ...state,
      connectedCache: true,
      connectedDatabase: true
    }),
  [create([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
