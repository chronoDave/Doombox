import { handleActions } from 'redux-actions';

// Types
import {
  create,
  USER_CACHE,
  USER
} from '@doombox/utils/types';
import {
  DELETE,
  READ
} from '@doombox/utils/types/crudTypes';
import {
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types/asyncTypes';

const initialState = {
  pendingCache: false,
  errorCache: false,
  pendingRemote: false,
  connectedRemote: false,
};

export const systemReducer = handleActions({
  [create([PENDING, READ, USER_CACHE])]:
    state => ({
      ...state,
      pendingCache: true,
      errorCache: false
    }),
  [create([ERROR, READ, USER_CACHE])]:
    state => ({
      ...state,
      pendingCache: false,
      errorCache: true
    }),
  [create([SUCCESS, DELETE, USER])]: () => initialState
}, initialState);
