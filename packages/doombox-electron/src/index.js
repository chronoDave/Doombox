const { app } = require('electron');

// Lib
const { createWindow } = require('./lib/window');
const { createKeyboardListener } = require('./lib/listener');

// Utils
const { COMMANDS_AUDIO } = require('../../doombox-utils/const');

app.on('ready', () => {
  const mainWindow = createWindow();

  const keybinds = {
    [COMMANDS_AUDIO.NEXT]: 'CommandOrControl+Alt+Right',
    [COMMANDS_AUDIO.PREVIOUS]: 'CommandOrControl+Alt+Left',
    [COMMANDS_AUDIO.PLAY]: 'CommandOrControl+Alt+\\',
    [COMMANDS_AUDIO.PAUSE]: null,
    [COMMANDS_AUDIO.VOLUME_UP]: 'CommandOrControl+Alt+Up',
    [COMMANDS_AUDIO.VOLUME_DOWN]: 'CommandOrControl+Alt+Down',
    [COMMANDS_AUDIO.MUTE]: null
  };

  createKeyboardListener(mainWindow.webContents, keybinds);
});

app.on('window-all-closed', () => {
  app.quit();
});
