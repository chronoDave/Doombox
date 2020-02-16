import { TYPE } from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcReadOne,
  ipcUpdate,
  ipcUpdateOne,
  ipcDeleteOne,
  ipcDelete
} from './crud';

// Library
export const createLibrary = folders => ipcCreate(TYPE.IPC.LIBRARY, folders);

export const fetchLibrary = (
  limit,
  offset = 0,
  sort = 'albumartist'
) => ipcRead(TYPE.IPC.LIBRARY, {}, {
  transform: 'library',
  offset,
  limit,
  sort
});

export const queryLibrary = (
  limit,
  offset = 0,
  regex
) => ipcRead(TYPE.IPC.LIBRARY, {}, {
  transform: 'library',
  offset,
  limit,
  regex
});

export const fetchLabels = () => ipcRead(TYPE.IPC.LIBRARY, {}, {
  transform: 'label'
});

export const queryLabels = regex => ipcRead(TYPE.IPC.LIBRARY, {}, {
  transform: 'label',
  regex
});

export const updateLibraryFolder = folder => ipcUpdate(
  TYPE.IPC.LIBRARY,
  { query: folder }
);

export const deleteLibraryFolder = folder => ipcDelete(TYPE.IPC.LIBRARY, folder);

// Mixography
export const fetchMixography = () => ipcRead(
  TYPE.IPC.PLAYLIST,
  {},
  { collectionToCount: true }
);

// Playlist
export const fetchPlaylist = (
  _id,
  action,
  {
    projection = {},
    regex = null,
    sort = null,
    name = null,
  } = {}
) => ipcReadOne(
  TYPE.IPC.PLAYLIST,
  _id,
  projection,
  {
    action,
    regex,
    sort,
    name
  }
);

export const createPlaylist = playlist => ipcCreate(
  TYPE.IPC.PLAYLIST,
  playlist,
  { collectionToCount: true }
);

export const updatePlaylist = (_id, payload) => ipcUpdateOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { $set: payload },
  { collectionToCount: true }
);

export const deletePlaylist = id => ipcDeleteOne(
  TYPE.IPC.PLAYLIST,
  id,
  { collectionToCount: true }
);

// Storage
export const fetchStorage = (type, options = {}) => {
  const validStorage = [
    TYPE.IPC.CONFIG,
    TYPE.IPC.CACHE
  ];

  if (!validStorage.includes(type)) throw new Error(`Invalid type: ${type}`);
  ipcRead(type, {}, options);
};

export const updateStorage = (type, _id, payload, options = {}) => {
  const validStorage = [
    TYPE.IPC.CONFIG,
    TYPE.IPC.CACHE
  ];

  if (!validStorage.includes(type)) throw new Error(`Invalid type: ${type}`);
  ipcUpdateOne(type, _id, payload, options);
};

export const updateConfig = Object.values(TYPE.CONFIG)
  .map(config => ({
    [config]: payload => updateStorage(
      TYPE.IPC.CONFIG,
      config,
      payload
    )
  }))
  .reduce((acc, cur) => ({ ...acc, ...cur }), {});

// Rpc
export const updateRpc = (payload, options = {}) => ipcUpdate(
  TYPE.IPC.RPC, {}, payload, options
);
