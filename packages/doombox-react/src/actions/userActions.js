// Types
import {
  GET_USERS,
  GET_USER,
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
    const image = user.avatar ? await createImage(user.avatar) : null;

    ipcRenderer.send(asyncActionPending(CREATE_USER), {
      ...user,
      avatar: image ? image._id.toString() : null
    });
  } catch (err) {
    dispatch({ type: asyncActionError(CREATE_USER), payload: err.payload });
  }
};

export const getUser = (username, data) => dispatch => {
  dispatch({ type: asyncActionPending(GET_USER) });
  ipcRenderer.send(asyncActionPending(GET_USER), `
    query {
      user(username: "${username}") {
        ${data ? data.join('\n') : `
          username
          avatar {
            path
          }
        `}
      }
    }
  `);
};

export const getUsers = data => dispatch => {
  dispatch({ type: asyncActionPending(GET_USERS) });
  ipcRenderer.send(asyncActionPending(GET_USERS), `
    query {
      users {
        ${data ? data.join('\n') : `
          username
          avatar {
            path
          }
        `}
      }
    }
  `);
};
