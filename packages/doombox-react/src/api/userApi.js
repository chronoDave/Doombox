// Types
import {
  PENDING
} from '@doombox/utils/types/asyncTypes';
import {
  CREATE,
  UPDATE,
  DELETE
} from '@doombox/utils/types/crudTypes';
import {
  create,
  USER
} from '@doombox/utils/types';

// Actions
const { ipcRenderer } = window.require('electron');

export const createUser = user => dispatch => {
  const actionType = create([PENDING, CREATE, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, user);
};

export const updateUser = (_id, values) => dispatch => {
  const actionType = create([PENDING, UPDATE, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, { _id, ...values });
};

export const deleteUser = _id => dispatch => {
  const actionType = create([PENDING, DELETE, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, _id);
};
