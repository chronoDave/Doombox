// Types
import {
  createType,
  PENDING,
  CREATE,
  READ,
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

  ipcRenderer.send(actionType, { $where: () => ids.include(this._id) });
};
