// Types
import {
  createType,
  PENDING,
  CREATE,
  READ,
  UPDATE,
  DELETE,
  USER,
} from '@doombox/utils/types';

// Actions
const { ipcRenderer } = window.require('electron');

export const createUser = user => dispatch => {
  const actionType = createType([PENDING, CREATE, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, user);
};

export const readUser = _id => dispatch => {
  const actionType = createType([PENDING, READ, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, { query: { _id } });
};

export const updateUser = (_id, values) => dispatch => {
  const actionType = createType([PENDING, UPDATE, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, { _id, ...values });
};

export const deleteUser = _id => dispatch => {
  const actionType = createType([PENDING, DELETE, USER]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, _id);
};
