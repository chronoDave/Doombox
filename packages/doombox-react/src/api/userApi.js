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
import { createImage } from './imageApi';

const { ipcRenderer } = window.require('electron');

const getImageId = async image => {
  try {
    if (image) {
      const newImage = await createImage(image);
      return newImage._id.toString();
    }
    return image;
  } catch (err) {
    return err;
  }
};

export const createUser = user => dispatch => {
  dispatch({ type: asyncActionPending(CREATE_USER) });

  ipcRenderer.send(asyncActionPending(CREATE_USER), user);
};

export const updateUser = (id, user) => async dispatch => {
  try {
    dispatch({ type: asyncActionPending(UPDATE_USER) });

    const background = await getImageId(user.background);
    const avatar = await getImageId(user.avatar);

    ipcRenderer.send(asyncActionPending(UPDATE_USER), {
      id, values: { ...user, avatar, background }
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
