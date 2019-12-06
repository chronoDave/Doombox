const { app } = require('electron');
const { COMMANDS_AUDIO } = require('@doombox/utils/const');

// Lib
const { createWindow } = require('./lib/window');
const { createKeyboardListener } = require('./lib/listener');
const Store = require('./lib/store');

const userConfig = new Store({
  fileName: 'user-config',
  defaults: {
    keybinds: {
      [COMMANDS_AUDIO.NEXT]: 'CommandOrControl+Alt+Right',
      [COMMANDS_AUDIO.PREVIOUS]: 'CommandOrControl+Alt+Left',
      [COMMANDS_AUDIO.PLAY]: 'CommandOrControl+Alt+\\',
      [COMMANDS_AUDIO.PAUSE]: null,
      [COMMANDS_AUDIO.VOLUME_UP]: 'CommandOrControl+Alt+Up',
      [COMMANDS_AUDIO.VOLUME_DOWN]: 'CommandOrControl+Alt+Down',
      [COMMANDS_AUDIO.MUTE]: null
    }
  }
});

const appConfig = new Store({
  fileName: 'app-config',
  defaults: {
    window: {
      width: 800,
      height: 600
    }
  }
});

// DB
const NeDB = require('./lib/database/nedb');

mkdirp.sync(PATH.LOG);

const db = new NeDB();

app.on('ready', () => {
  const mainWindow = createWindow();

  createKeyboardListener(mainWindow.webContents, userConfig.get('keybinds'));
});

app.on('window-all-closed', () => {
  app.quit();
});
