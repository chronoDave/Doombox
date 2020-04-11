import { TYPE } from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcDeleteOne
} from './crud';

export const fetchFavorites = () => ipcRead(TYPE.IPC.FAVORITES);
export const addFavorite = song => ipcCreate(TYPE.IPC.FAVORITES, song);
export const removeFavorite = _id => ipcDeleteOne(TYPE.IPC.FAVORITES, _id);
