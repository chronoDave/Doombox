const { globalShortcut } = require('electron');
const { TYPES_IPC } = require('@doombox/utils/const');

const createKeyboardListener = (window, keybinds = {}) => (
  Object.entries(keybinds).forEach(([command, keybind]) => {
    if (!keybind) return;
    globalShortcut.register(keybind, () => window.send(TYPES_IPC.KEYBOARD, command));
  })
);

module.exports = {
  createKeyboardListener
};
