const { ACTION } = require('@doombox/utils');

// Lib
const Store = require('../lib/store');

const userConfig = new Store({
  fileName: 'user-config',
  defaults: {
    general: {
      forceQuit: false
    },
    keybinds: {
      [ACTION.AUDIO.NEXT]: 'CommandOrControl+Alt+Right',
      [ACTION.AUDIO.PREVIOUS]: 'CommandOrControl+Alt+Left',
      [ACTION.AUDIO.PLAY]: 'CommandOrControl+Alt+\\',
      [ACTION.AUDIO.PAUSE]: null,
      [ACTION.AUDIO.STOP]: null,
      [ACTION.AUDIO.VOLUME_UP]: 'CommandOrControl+Alt+Up',
      [ACTION.AUDIO.VOLUME_DOWN]: 'CommandOrControl+Alt+Down',
      [ACTION.AUDIO.MUTE]: null
    },
    palette: {
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

const appConfig = new Store({
  fileName: 'app-config',
  defaults: {
    player: {
      volume: 1,
      autoplay: true,
      muted: false
    },
    parser: {
      logging: true,
      fileFormats: ['mp3'],
      glob: null,
      parseStrict: false
    },
    dimension: {
      width: 640,
      height: 480
    }
  }
});

module.exports = {
  userConfig,
  appConfig
};
