import {
  TYPE,
  ACTION,
  CONFIG,
  CACHE
} from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcReadOne,
  ipcUpdate,
  ipcUpdateOne,
  ipcDelete,
  ipcDeleteOne
} from './crud';

// Library
export const createLibrary = folders => ipcCreate(TYPE.IPC.LIBRARY, folders);
export const fetchLibrary = () => ipcRead(TYPE.IPC.LIBRARY);
export const searchLibrary = (regex = null, sort = null) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    regex,
    sort
  }
);
export const playLibrary = ({
  name = null,
  query = null,
  regex = null,
  sort = {
    'metadata.disk.no': 1,
    'metadata.track.no': 1
  }
}) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.PLAYLIST.SET,
    query,
    regex,
    sort
  },
  { name }
);
export const addLibrary = ({
  query = null,
  regex = null,
  sort = {
    'metadata.disk.no': 1,
    'metadata.track.no': 1
  }
}) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.PLAYLIST.ADD,
    query,
    regex,
    sort
  }
);
export const updateFolder = folder => ipcUpdate(
  TYPE.IPC.LIBRARY,
  { query: folder }
);
export const deleteFolder = folder => ipcDelete(
  TYPE.IPC.LIBRARY,
  { query: folder }
);
export const dropLibrary = () => ipcDelete(TYPE.IPC.LIBRARY);

// Playlist
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

// Favorites
export const fetchFavorites = () => ipcRead(TYPE.IPC.FAVORITES);
export const addFavorite = song => ipcCreate(TYPE.IPC.FAVORITES, song);
export const removeFavorite = _id => ipcDeleteOne(TYPE.IPC.FAVORITES, _id);

// Storage
const createUpdateStorage = storage => Object.keys(storage)
  .map(config => ({
    [config]: payload => ipcUpdateOne(
      TYPE.IPC.CONFIG,
      config,
      payload
    )
  }))
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export const fetchConfig = () => ipcRead(TYPE.IPC.CONFIG);
export const fetchCache = () => ipcRead(TYPE.IPC.CACHE);
export const updateConfig = createUpdateStorage(CONFIG);
export const updateCache = createUpdateStorage(CACHE);

// RPC
export const setRpc = payload => ipcCreate(TYPE.IPC.RPC, payload);
