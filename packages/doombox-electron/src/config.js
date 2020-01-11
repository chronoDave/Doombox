const {
  ACTION,
  TYPE
} = require('@doombox/utils');
const {
  CACHE,
  OPTIONS
} = require('./utils/const');

module.exports = {
  CONFIG: {
    USER: {
      [TYPE.CONFIG.GENERAL]: {
        forceQuit: false,
        hardwareAcceleration: true,
      },
      [TYPE.CONFIG.DISCORD]: {
        discordToken: null,
        imageKey: null
      },
      [TYPE.CONFIG.KEYBIND]: {
        [ACTION.AUDIO.NEXT]: 'CommandOrControl+Alt+Right',
        [ACTION.AUDIO.PREVIOUS]: 'CommandOrControl+Alt+Left',
        [ACTION.AUDIO.PLAY]: 'CommandOrControl+Alt+\\',
        [ACTION.AUDIO.PAUSE]: null,
        [ACTION.AUDIO.STOP]: null,
        [ACTION.AUDIO.VOLUME_UP]: 'CommandOrControl+Alt+Up',
        [ACTION.AUDIO.VOLUME_DOWN]: 'CommandOrControl+Alt+Down',
        [ACTION.AUDIO.MUTE]: null
      },
      [TYPE.CONFIG.PALETTE]: {
        darkTheme: true,
        backgroundOpacity: true,
        primary: null,
        secondary: null,
        error: null,
        warning: null,
        success: null,
        info: null,
        grey: null
      }
    },
    SYSTEM: {
      [TYPE.CONFIG.PARSER]: {
        [OPTIONS.SKIP_COVERS]: false,
        [OPTIONS.PATH_IMAGE]: null,
        [OPTIONS.FILE_FORMATS]: ['mp3'],
        [OPTIONS.GLOB]: null,
        [OPTIONS.PARSE_STRICT]: false
      }
    },
    CACHE: {
      [TYPE.CONFIG.PLAYER]: {
        volume: 1,
        autoplay: true,
        muted: false
      },
      [CACHE.DIMENSIONS]: {
        width: 640,
        height: 480
      }
    }
  }
};
