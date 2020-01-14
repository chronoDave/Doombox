import { TYPE, ACTION } from '@doombox/utils';
import shortid from 'shortid';

// Electron
const { ipcRenderer } = window.require('electron');

export const createPlaylist = (name, src, collection = []) => ipcRenderer.send(
  TYPE.IPC.PLAYLIST, {
    action: ACTION.CRUD.CREATE,
    data: {
      payload: {
        _id: shortid.generate(),
        collection,
        name,
        src
      }
    }
  }
);

export const deletePlaylist = _id => ipcRenderer.send(
  TYPE.IPC.PLAYLIST, {
    action: ACTION.CRUD.DELETE,
    data: { payload: { _id } }
  }
);

export const scanFolders = payload => ipcRenderer.send(
  TYPE.IPC.LIBRARY, {
    action: ACTION.CRUD.CREATE,
    data: { payload: payload.folders }
  }
);

export const readStorage = type => ipcRenderer.send(type, { action: ACTION.CRUD.READ });

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

export const queryLibrary = query => {
  const payload = query === '' ? ({ query: '' }) : ({
    logic: {
      operator: 'or',
      expressions: [
        { key: 'metadata.artist', expression: query },
        { key: 'metadata.title', expression: query },
        { key: 'metadata.album', expression: query },
        { key: 'metadata.label', expression: query },
        { key: 'metadata.albumartist', expression: query }
      ]
    }
  });

  ipcRenderer.send(TYPE.IPC.LIBRARY, {
    action: ACTION.CRUD.READ,
    data: payload
  });
};

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
