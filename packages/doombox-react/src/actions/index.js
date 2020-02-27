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

export const queryLibrary = (regex = null, { sort = null } = {}) => ipcRead(
  TYPE.IPC.LIBRARY,
  { regex, sort }
);

/**
 * @param {String} action - Action key
 * @param {String[]} collection - Array of _id's
 */
export const libraryActionPlaylist = (
  action,
  { name, collection },
  {
    sort = {
      'metadata.disk.no': 1,
      'metadata.track.no': 1
    }
  } = {}
) => ipcRead(
  TYPE.IPC.LIBRARY,
  {
    regex: {
      operator: 'or',
      expressions: collection
        .map(expression => ({ key: '_id', expression }))
    },
    sort
  },
  {
    name,
    action
  }
);

export const updateLibraryFolder = folder => ipcUpdate(
  TYPE.IPC.LIBRARY,
  { query: folder }
);

export const deleteLibraryFolder = folder => ipcDelete(
  TYPE.IPC.LIBRARY,
  { query: folder }
);

// Mixography
export const fetchMixography = () => ipcRead(TYPE.IPC.PLAYLIST);

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
  playlist
);

export const updatePlaylist = (_id, payload) => ipcUpdateOne(
  TYPE.IPC.PLAYLIST,
  _id,
  { query: { $set: payload } }
);

export const deletePlaylist = id => ipcDeleteOne(
  TYPE.IPC.PLAYLIST,
  id
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
