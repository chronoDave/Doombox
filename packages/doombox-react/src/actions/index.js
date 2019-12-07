const { ipcRenderer } = window.require('electron');

/**
 * @param {string} type - IPC type
 * @param {Object} payload
 * @param {string} payload.action
 * @param {Object} payload.data
 */
export const sendIpc = (type, payload) => ipcRenderer.send(type, payload);
