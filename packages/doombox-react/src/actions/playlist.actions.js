import { TYPE } from '@doombox/utils';

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
export const fetchPlaylist = (_id, action) => ipcReadOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { action },
  { cache: true }
);
export const fetchMixtape = (_id, action) => ipcReadOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { action }
);
export const updateMixtape = (_id, playlist) => ipcUpdateOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { $set: playlist }
);
export const deletePlaylist = _id => ipcDeleteOne(TYPE.IPC.PLAYLIST, _id);
