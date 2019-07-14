// Types
import {
  UPDATE_USER,
  GET_USER_CACHE,
  DELETE_USER,
  CREATE_USER
} from '@doombox/utils/types/userTypes';
import {
  asyncActionPending,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

// Actions
import { createImage } from './imageActions';

const { ipcRenderer } = window.require('electron');

export const createUser = user => async dispatch => {
  try {
    dispatch({ type: asyncActionPending(CREATE_USER) });
    const avatar = user.avatar ? await createImage(user.avatar) : null;

    ipcRenderer.send(asyncActionPending(CREATE_USER), {
      ...user,
      avatar: avatar ? avatar._id.toString() : null
    });
  } catch (err) {
    dispatch({ type: asyncActionError(CREATE_USER), payload: err.payload });
  }
};

export const updateUser = (id, values) => async dispatch => {
  try {
    dispatch({ type: asyncActionPending(UPDATE_USER) });
    const background = values.background ? await createImage(values.background) : null;
    const avatar = values.avatar ? await createImage(values.avatar) : null;

    ipcRenderer.send(asyncActionPending(UPDATE_USER), {
      id,
      values: {
        ...values,
        avatar: avatar ? avatar._id.toString() : null,
        background: background ? background._id.toString() : null
      }
    });
  } catch (err) {
    dispatch({ type: asyncActionError(CREATE_USER), payload: err.payload });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    dispatch({ type: asyncActionPending(DELETE_USER) });
    ipcRenderer.send(asyncActionPending(DELETE_USER), id);
  } catch (err) {
    dispatch({ type: asyncActionError(DELETE_USER), payload: err.payload });
  }
};

export const getCachedUser = () => dispatch => {
  dispatch({ type: asyncActionPending(GET_USER_CACHE) });
  ipcRenderer.send(asyncActionPending(GET_USER_CACHE));
};
