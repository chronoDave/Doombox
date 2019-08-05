import { handleActions, combineActions } from 'redux-actions';

// Types
import {
  PENDING,
  ERROR,
  SUCCESS
} from '@doombox/utils/types/asyncTypes';
import {
  CREATE,
  READ
} from '@doombox/utils/types/crudTypes';
import {
  create,
  LIBRARY
} from '@doombox/utils/types';

const intialState = {
  pending: false,
  error: false,
  collection: []
};

export const libraryReducer = handleActions({
  [combineActions(
    create([PENDING, CREATE, LIBRARY]),
    create([PENDING, READ, LIBRARY])
  )]:
    state => ({
      ...state,
      pending: true,
      error: false
    }),
  [combineActions(
    create([ERROR, CREATE, LIBRARY]),
    create([ERROR, READ, LIBRARY])
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      error: action.payload
    }),
  [combineActions(
    create([SUCCESS, CREATE, LIBRARY]),
    create([SUCCESS, READ, LIBRARY])
  )]:
    (state, action) => ({
      ...state,
      pending: false,
      collection: action.payload
    })
}, intialState);
