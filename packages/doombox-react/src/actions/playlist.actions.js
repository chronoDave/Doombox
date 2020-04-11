import {
  TYPE,
  ACTION
} from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcReadOne,
  ipcUpdateOne,
  ipcDeleteOne
} from './crud';

export const createPlaylist = playlist => ipcCreate(TYPE.IPC.PLAYLIST, playlist);
export const fetchMixography = () => ipcRead(TYPE.IPC.PLAYLIST);
export const fetchPlaylist = _id => ipcReadOne(TYPE.IPC.PLAYLIST, _id);
export const playPlaylist = _id => ipcReadOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { action: ACTION.PLAYLIST.SET }
);
export const addPlaylist = _id => ipcReadOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { action: ACTION.PLAYLIST.ADD }
);
export const updatePlaylist = (_id, playlist) => ipcUpdateOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { $set: playlist }
);
export const deletePlaylist = _id => ipcDeleteOne(TYPE.IPC.PLAYLIST, _id);
