const { globalShortcut } = require('electron');
const fs = require('fs');
const path = require('path');
const { TYPE } = require('@doombox/utils');

// Utils
const { PATH } = require('./const');

// General
const cleanFileName = string => string.replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');
const errorToJson = err => JSON.stringify(err, Object.getOwnPropertyNames(err));
const arrayToObject = (key, array) => array
  .reduce((acc, cur) => ({
    ...acc,
    [cur[key]]: { ...cur }
  }), {});
const stripKeys = object => Object.keys(object)
  .filter(key => object[key] !== undefined || object[key] !== null)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: object[cur]
  }), {});

// Logging
const createLog = (name, text) => fs.writeFileSync(
  path.join(PATH.LOG, `${name}_${new Date().getTime()}.txt`),
  text
);
const createLogError = err => createLog('error', errorToJson(err));

// Electron
const createKeyboardListener = (keybinds = {}, callback) => (
  Object.entries(keybinds).forEach(([action, keybind]) => {
    if (!keybind) return;
    globalShortcut.register(keybind, () => callback({ action, keybind }));
  })
);
const handleErrorIpc = (event, type, err) => {
  const errJson = errorToJson(err);
  createLog(`error_${type}`, errJson);
  event.sender.send(TYPE.IPC.MESSAGE, { err: errJson });
};

module.exports = {
  arrayToObject,
  stripKeys,
  errorToJson,
  handleErrorIpc,
  createKeyboardListener,
  createLog,
  createLogError,
  cleanFileName
};
