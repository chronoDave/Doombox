// Types
import {
  CREATE_CONNECTION,
  UPDATE_CONNECTION
} from '@doombox/utils/types/systemTypes';
import {
  asyncActionPending,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const { ipcRenderer } = window.require('electron');

export const createConnection = url => dispatch => {
  dispatch({ type: asyncActionPending(CREATE_CONNECTION) });

  ipcRenderer.send(asyncActionPending(CREATE_CONNECTION), url);
};

export const updateConnection = url => dispatch => {
  dispatch({ type: asyncActionPending(UPDATE_CONNECTION) });

  ipcRenderer.send(asyncActionPending(UPDATE_CONNECTION), url);
};

export const disconnect = () => dispatch => {
  dispatch({ type: asyncActionError(CREATE_CONNECTION) });
};
