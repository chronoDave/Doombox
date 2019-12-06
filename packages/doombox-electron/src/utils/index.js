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

const createLog = (name, text) => fs.writeFileSync(
  path.join(PATH.LOG, `${name}_${new Date().getTime()}.txt`),
  text
);

const createLogError = err => createLog(
  'error',
  JSON.stringify(err, Object.getOwnPropertyNames(err))
);

module.exports = {
  createKeyboardListener,
  createLog,
  createLogError
};
