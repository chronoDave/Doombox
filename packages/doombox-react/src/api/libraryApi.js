// Types
import {
  create,
  LIBRARY,
  PENDING,
  CREATE,
  READ
} from '@doombox/utils/types';

const { ipcRenderer } = window.require('electron');

export const scanLibrary = paths => dispatch => {
  const actionType = create([PENDING, CREATE, LIBRARY]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, paths);
};

export const fetchLibrary = () => {
  ipcRenderer.send(create([PENDING, READ, LIBRARY]), {});
};
