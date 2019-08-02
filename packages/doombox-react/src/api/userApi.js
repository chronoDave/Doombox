// Types
import {
  actionPending
} from '@doombox/utils/types/asyncTypes';
import {
  actionCreate,
  actionUpdate,
  actionDelete
} from '@doombox/utils/types/crudTypes';
import {
  USER
} from '@doombox/utils/types';

// Actions
const { ipcRenderer } = window.require('electron');

export const createUser = user => dispatch => {
  dispatch({ type: actionPending(actionCreate(USER)) });

  ipcRenderer.send(actionPending(actionCreate(USER)), user);
};

export const updateUser = (_id, values) => dispatch => {
  dispatch({ type: actionPending(actionUpdate(USER)) });

  ipcRenderer.send(actionPending(actionUpdate(USER)), { _id, ...values });
};

export const deleteUser = _id => dispatch => {
  dispatch({ type: actionPending(actionDelete(USER)) });

  ipcRenderer.send(actionPending(actionDelete(USER)), _id);
};
