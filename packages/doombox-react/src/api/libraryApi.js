// Types
import {
  createType,
  LIBRARY,
  PENDING,
  READ,
  SONG,
  CREATE
} from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const scanLibrary = paths => dispatch => {
  const actionType = createType([PENDING, CREATE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, paths);
};

export const fetchMetadata = id => {
  ipcRenderer.send(createType([PENDING, READ, SONG]), id);
};
