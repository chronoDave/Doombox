// Types
import {
  PENDING,
  CREATE,
  READ,
  UPDATE,
  DELETE,
  create,
  USER,
  USER_CACHE
} from '@doombox/utils/types';

// Actions
const { ipcRenderer } = window.require('electron');

export const getCachedProfile = () => {
  ipcRenderer.send(create([PENDING, READ, USER_CACHE]));
};

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
