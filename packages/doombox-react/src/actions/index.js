import { TYPE, ACTION } from '@doombox/utils';
import shortid from 'shortid';

// Electron
const { ipcRenderer } = window.require('electron');

export const createPlaylist = (name, src) => ipcRenderer.send(
  TYPE.IPC.PLAYLIST, {
    action: ACTION.CRUD.CREATE,
    data: {
      _id: shortid.generate(),
      collection: [],
      name,
      src
    }
  }
);

export const scanFolders = payload => ipcRenderer.send(
  TYPE.IPC.LIBRARY, {
    action: ACTION.CRUD.CREATE,
    data: { payload: payload.folders }
  }
);

export const readStorage = (type, key) => ipcRenderer.send(
  type, {
    action: ACTION.CRUD.READ,
    data: { key }
  }
);

export const readCollection = (
  type,
  {
    query = {},
    projection = {},
    sort = {},
    castObject = false
  } = {}
) => (
  ipcRenderer.send(type, {
    action: ACTION.CRUD.READ,
    data: {
      query,
      modifiers: {
        projection,
        sort,
        castObject
      }
    }
  })
);

export const queryLibrary = query => ipcRenderer.send(
  TYPE.IPC.LIBRARY,
  {
    action: ACTION.CRUD.READ,
    data: {
      regex: [
        { property: 'metadata.artist', expression: query },
        { property: 'metadata.title', expression: query },
        { property: 'metadata.album', expression: query },
        { property: 'metadata.label', expression: query },
        { property: 'metadata.albumartist', expression: query }
      ]
    }
  }
);

export const updateStorage = (type, key, payload) => ipcRenderer.send(
  type, {
    action: ACTION.CRUD.UPDATE,
    data: { key, payload }
  }
);

export const updateRpc = status => ipcRenderer.send(
  TYPE.IPC.RPC, {
    action: ACTION.CRUD.UPDATE,
    data: status
  }
);
