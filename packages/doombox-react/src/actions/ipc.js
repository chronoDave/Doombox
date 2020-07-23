import { ipcRenderer } from 'electron';
import { IPC } from '@doombox/utils';

/**
 * @param {string} channel
 * @param {object} payload
 */
export const ipcCreate = (channel, payload) => ipcRenderer.send(channel, {
  action: IPC.ACTION.CREATE,
  data: {
    payload
  }
});

/**
 * @param {string} channel
 * @param {object} query
 * @param {object} modifiers
 * @param {number} modifiers.skip
 * @param {number} modifiers.limit
 * @param {object} modifiers.projection
 * @param {boolean} modifiers.castObject
 */
export const ipcRead = (
  channel,
  query = {},
  modifiers = {}
) => ipcRenderer.send(channel, {
  action: IPC.ACTION.READ,
  data: {
    query,
    modifiers
  }
});

/**
 * @param {string} channel
 * @param {string} _id
 * @param {object} projection
 */
export const ipcReadOne = (
  channel,
  _id,
  projection = {}
) => ipcRenderer.send(channel, {
  action: IPC.ACTION.READ_ONE,
  data: {
    _id,
    modifiers: {
      projection
    }
  }
});

/**
 * @param {string} channel
 * @param {object} query
 * @param {object} payload
 */
export const ipcUpdate = (
  channel,
  query,
  payload
) => ipcRenderer.send(channel, {
  action: IPC.ACTION.UPDATE,
  data: {
    query,
    payload
  }
});

/**
 * @param {string} channel
 * @param {string} _id
 * @param {object} payload
 */
export const ipcUpdateOne = (
  channel,
  _id,
  payload
) => ipcRenderer.send(channel, {
  action: IPC.ACTION.UPDATE_ONE,
  data: {
    _id,
    payload
  }
});

/**
 * @param {string} channel
 * @param {object} payload
 */
export const ipcDelete = (channel, query) => ipcRenderer.send(channel, {
  action: IPC.ACTION.DELETE,
  data: {
    query
  }
});

/**
 * @param {string} channel
 * @param {string} _id
 */
export const ipcDeleteOne = (channel, _id) => ipcRenderer.send(channel, {
  action: IPC.ACTION.DELETE_ONE,
  data: {
    _id
  }
});

/**
 * @param {string} channel
 */
export const ipcDrop = channel => ipcRenderer.send(channel, {
  action: IPC.ACTION.DELETE_ONE,
  data: {}
});
