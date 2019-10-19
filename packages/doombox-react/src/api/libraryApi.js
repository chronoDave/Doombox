// Types
import {
  createType,
  LIBRARY,
  PENDING,
  READ,
  DELETE,
  SONG,
  CREATE
} from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const scanLibrary = path => dispatch => {
  const actionType = createType([PENDING, CREATE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, path);
};

export const deleteLibrary = () => dispatch => {
  const actionType = createType([PENDING, DELETE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType);
};

export const fetchMetadata = _id => {
  ipcRenderer.send(createType([PENDING, READ, SONG]), { query: { _id } });
};

export const fetchCollection = query => dispatch => {
  const actionType = createType([PENDING, READ, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, query);
};
