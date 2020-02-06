import { ACTION } from '@doombox/utils';

// Electron
const { ipcRenderer } = window.require('electron');

// General
export const ipcCreate = (
  type,
  payload,
  options = {}
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.CREATE,
  data: {
    payload
  },
  options
});

export const ipcRead = (
  type,
  {
    skip = 0,
    limit = 0,
    query = {},
    projection = {},
    sort = {},
    castObject = false
  } = {},
  options = {}
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.READ,
  data: {
    query,
    modifiers: {
      projection,
      skip,
      limit,
      sort,
      castObject
    }
  },
  options
});

export const ipcReadOne = (
  type,
  _id,
  projection = {},
  options = {}
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.READ_ONE,
  data: {
    _id,
    projection
  },
  options
});

export const ipcUpdate = (
  type,
  { query = {} },
  update,
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.UPDATE,
  data: {
    query,
    update
  },
  options
});

export const ipcUpdateOne = (
  type,
  _id,
  update,
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.UPDATE_ONE,
  data: {
    _id,
    update
  },
  options
});

export const ipcDelete = (
  type,
  query,
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.DELETE,
  data: {
    query
  },
  options
});

export const ipcDeleteOne = (
  type,
  _id,
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.DELETE_ONE,
  data: {
    _id
  },
  options
});

export const ipcDrop = (
  type,
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.DROP,
  options
});
