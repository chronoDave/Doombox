import { TYPE } from '@doombox/utils';

// Crud
import {
  ipcCreate,
  ipcRead,
  ipcReadOne,
  ipcUpdate,
  ipcUpdateOne,
  ipcDeleteOne
} from './crud';

// Library
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

// Rpc
export const updateRpc = (payload, options = {}) => ipcUpdate(
  TYPE.IPC.RPC, {}, payload, options
);

// // General
// export const readCollection = (
//   type,
//   {
//     skip = 0,
//     limit = 0,
//     query = {},
//     projection = {},
//     sort = {},
//     castObject = false
//   } = {},
//   options = {}
// ) => (
//   ipcRenderer.send(type, {
//     action: ACTION.CRUD.READ,
//     data: {
//       query,
//       modifiers: {
//         projection,
//         sort,
//         castObject,
//         skip,
//         limit
//       },
//       options
//     }
//   })
// );

// // Playlist
// /**
//  * @param {Object} playlist
//  * @param {Object[]} playlist.collection
//  * @param {String} playlist.name
//  * @param {String} playlist.src
//  */


// // Library
// export const scanFolders = folders => ipcRenderer.send(
//   TYPE.IPC.LIBRARY, {
//     action: ACTION.CRUD.CREATE,
//     data: { payload: folders }
//   }
// );

// export const getAlbums = (offset = 0) => readCollection(
//   TYPE.IPC.LIBRARY,
//   { skip: offset, limit: 1000 },
//   { transform: 'album' }
// );

// export const getLabels = (offset = 0) => readCollection(
//   TYPE.IPC.LIBRARY,
//   { skip: offset, limit: 1000 },
//   { transform: 'label' }
// );

// export const queryLibrary = query => {
//   const payload = query === '' ? ({ query: '' }) : ({
//     logic: {
//       operator: 'or',
//       expressions: [
//         { key: 'metadata.artist', expression: query },
//         { key: 'metadata.title', expression: query },
//         { key: 'metadata.album', expression: query },
//         { key: 'metadata.label', expression: query },
//         { key: 'metadata.albumartist', expression: query }
//       ]
//     }
//   });

//   ipcRenderer.send(TYPE.IPC.LIBRARY, {
//     action: ACTION.CRUD.READ,
//     data: payload
//   });
// };

// // Storage
// export const readStorage = type => ipcRenderer.send(type, {
//   action: ACTION.CRUD.READ
// });

// export const updateStorage = (type, key, payload) => ipcRenderer.send(
//   type, {
//     action: ACTION.CRUD.UPDATE,
//     data: { key, payload }
//   }
// );

// // Rpc
// export const setRpc = (metadata, properties) => {
//   const data = {
//     largeImageText: metadata.album,
//     state: metadata.artist,
//     details: metadata.title,
//     ...properties
//   };

//   ipcRenderer.send(TYPE.IPC.RPC, { action: ACTION.CRUD.UPDATE, data });
// };
