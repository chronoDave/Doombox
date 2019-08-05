import { handleActions } from 'redux-actions';

// Types
import {
  create,
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
  connectedRemote: false,
  pendingCache: false,
  pendingRemote: false
};

export const systemReducer = handleActions({
  [create([PENDING, READ, USER_CACHE])]:
    state => ({
      ...state,
      pendingCache: true
    }),
  [create([ERROR, READ, USER_CACHE])]:
    state => ({
      ...state,
      pendingCache: false
    }),
  [create([SUCCESS, READ, USER_CACHE])]:
    state => ({
      ...state,
      pendingCache: false,
      connectedCache: true
    }),
  [create([SUCCESS, CREATE, USER])]:
    state => ({
      ...state,
      connectedCache: true
    }),
  [create([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
