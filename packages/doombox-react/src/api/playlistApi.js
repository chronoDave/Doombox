// Types
import {
  createType,
  PENDING,
  CREATE,
  READ,
  UPDATE,
  DELETE,
  PLAYLIST
} from '@doombox/utils/types/ipc';

const { ipcRenderer } = window.require('electron');

export const createPlaylist = playlist => dispatch => {
  const actionType = createType([PENDING, CREATE, PLAYLIST]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, playlist);
};

export const fetchPlaylist = ids => dispatch => {
  const actionType = createType([PENDING, READ, PLAYLIST]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, { _id: { $in: ids } });
};

export const updatePlaylist = (_id, modifiers) => dispatch => {
  const actionType = createType([PENDING, UPDATE, PLAYLIST]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, _id, modifiers);
};

export const deletePlaylist = _id => dispatch => {
  const actionType = createType([PENDING, DELETE, PLAYLIST]);
  dispatch({ type: actionType });

  ipcRenderer.send(actionType, _id);
};
