// Types
import {
  CREATE_CONNECTION
} from '@doombox/utils/types/systemTypes';
import {
  asyncActionPending,
  asyncActionError
} from '@doombox/utils/types/asyncTypes';

const { ipcRenderer } = window.require('electron');

export const tryConnection = url => async dispatch => {
  try {
    dispatch({ type: asyncActionPending(CREATE_CONNECTION) });

    ipcRenderer.send(asyncActionPending(CREATE_CONNECTION), url);
  } catch (err) {
    dispatch({ type: asyncActionError(CREATE_CONNECTION), payload: err.payload });
  }
};

export const disconnect = () => dispatch => {
  dispatch({ type: asyncActionError(CREATE_CONNECTION) });
};
