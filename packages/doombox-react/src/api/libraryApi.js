// Types
import {
  createType,
  LIBRARY,
  PENDING,
  READ,
  DELETE,
  SONG,
  CREATE,
  COLLECTION
} from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const scanLibrary = paths => dispatch => {
  const actionType = createType([PENDING, CREATE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, paths);
};

export const deleteLibrary = () => dispatch => {
  const actionType = createType([PENDING, DELETE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType);
};

export const fetchMetadata = id => {
  ipcRenderer.send(createType([PENDING, READ, SONG]), id);
};

export const fetchCollection = ({ type, ...rest }) => dispatch => {
  const actionType = createType([PENDING, READ, COLLECTION]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, { type, ...rest });
};
