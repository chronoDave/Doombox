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
    action = null,
    query = {},
    regex = null,
    skip = 0,
    limit = 0,
    projection = {},
    sort = {},
    castObject = false
  } = {},
  options = {}
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.READ,
  data: {
    action,
    query,
    regex,
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
  {
    projection = {},
    action = null
  } = {},
  options = {}
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.READ_ONE,
  data: {
    _id,
    action,
    projection
  },
  options
});

export const ipcUpdate = (
  type,
  {
    regex = null,
    query = {}
  },
  update,
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.UPDATE,
  data: {
    query,
    regex,
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
  {
    query = {},
    regex = null
  } = {},
  options
) => ipcRenderer.send(type, {
  action: ACTION.CRUD.DELETE,
  data: {
    query,
    regex
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
  data: {},
  options
});
