const { ACTION, STORAGE } = require('@doombox/utils');

// Lib
const Storage = require('../lib/storage');

const userConfig = new Storage({
  fileName: 'user-config',
  defaults: {
    [STORAGE.GENERAL]: {
      forceQuit: false
    },
    [STORAGE.DISCORD]: {
      discordToken: null,
      imageKey: null
    },
    [STORAGE.KEYBIND]: {
      [ACTION.AUDIO.NEXT]: 'CommandOrControl+Alt+Right',
      [ACTION.AUDIO.PREVIOUS]: 'CommandOrControl+Alt+Left',
      [ACTION.AUDIO.PLAY]: 'CommandOrControl+Alt+\\',
      [ACTION.AUDIO.PAUSE]: null,
      [ACTION.AUDIO.STOP]: null,
      [ACTION.AUDIO.VOLUME_UP]: 'CommandOrControl+Alt+Up',
      [ACTION.AUDIO.VOLUME_DOWN]: 'CommandOrControl+Alt+Down',
      [ACTION.AUDIO.MUTE]: null
    },
    [STORAGE.PALETTE]: {
      darkTheme: true,
      primary: null,
      secondary: null,
      error: null,
      warning: null,
      success: null,
      info: null,
      grey: null
    }
  }
});

const systemConfig = new Storage({
  fileName: 'system-config',
  defaults: {
    [STORAGE.PARSER]: {
      logging: true,
      fileFormats: ['mp3'],
      glob: null,
      parseStrict: false
    },
  }
});

const systemCache = new Storage({
  fileName: 'system-cache',
  defaults: {
    [STORAGE.PLAYER]: {
      volume: 1,
      autoplay: true,
      muted: false
    },
    [STORAGE.DIMENSION]: {
      width: 640,
      height: 480
    }
  }
});

module.exports = {
  userConfig,
  systemConfig,
  systemCache
};
