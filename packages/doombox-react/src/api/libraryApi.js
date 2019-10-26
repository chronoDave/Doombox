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

/**
 * @param {string[]} paths
 */
export const parsePaths = paths => dispatch => {
  const actionType = createType([PENDING, CREATE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, paths);
};

export const fetchLibrary = query => dispatch => {
  const actionType = createType([PENDING, READ, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, query);
};

export const deleteLibrary = () => dispatch => {
  const actionType = createType([PENDING, DELETE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType);
};

export const fetchMetadata = _id => {
  ipcRenderer.send(createType([PENDING, READ, SONG]), _id);
};
