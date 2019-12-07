const { globalShortcut } = require('electron');
const fs = require('fs');
const path = require('path');

// Utils
const { PATH } = require('./const');

const createKeyboardListener = (keybinds = {}, callback) => (
  Object.entries(keybinds).forEach(([action, keybind]) => {
    if (!keybind) return;
    globalShortcut.register(keybind, () => callback({ action, keybind }));
  })
);

const errorToJson = err => JSON.stringify(err, Object.getOwnPropertyNames(err));

const createLog = (name, text) => fs.writeFileSync(
  path.join(PATH.LOG, `${name}_${new Date().getTime()}.txt`),
  text
);

const createLogError = err => createLog('error', errorToJson(err));

const handleErrorIpc = ({ event, type, err }) => {
  const errJson = errorToJson(err);

  createLog(`error_${type}`, errJson);
  event.sender.send(type, { err: errJson });
};

const cleanFileName = string => string.replace(/\/|\\|\*|\?|"|:|<|>|\.|\|/g, '_');

module.exports = {
  errorToJson,
  handleErrorIpc,
  createKeyboardListener,
  createLog,
  createLogError,
  cleanFileName
};
