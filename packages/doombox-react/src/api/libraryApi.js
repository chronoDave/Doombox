// Types
import {
  create,
  LIBRARY
} from '@doombox/utils/types';
import {
  PENDING
} from '@doombox/utils/types/asyncTypes';
import {
  CREATE,
  READ
} from '@doombox/utils/types/crudTypes';

const { ipcRenderer } = window.require('electron');

export const scanLibrary = paths => dispatch => {
  const actionType = create([PENDING, CREATE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, paths);
};

export const fetchLibrary = () => dispatch => {
  const actionType = create([PENDING, READ, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType);
};
