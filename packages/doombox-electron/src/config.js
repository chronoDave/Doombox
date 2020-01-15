const {
  ACTION,
  TYPE
} = require('@doombox/utils');

module.exports = {
  CONFIG: {
    USER: {
      [TYPE.CONFIG.GENERAL]: {
        [TYPE.OPTIONS.FORCE_QUIT]: false,
        [TYPE.OPTIONS.HARDWARE_ACCELERATION]: true,
        [TYPE.OPTIONS.BACKGROUND]: false
      },
      [TYPE.CONFIG.DISCORD]: {
        [TYPE.OPTIONS.TOKEN]: null,
        [TYPE.OPTIONS.KEY_IMAGE]: null
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
      },
      [TYPE.CONFIG.LIBRARY]: {
        [TYPE.OPTIONS.FOLDERS]: []
      },
      [TYPE.CONFIG.SEARCH]: {
        [TYPE.OPTIONS.DENSE]: false,
        [TYPE.OPTIONS.SLOW_SEARCH]: false
      }
    },
    SYSTEM: {
      [TYPE.CONFIG.PARSER]: {
        [TYPE.OPTIONS.SKIP_COVERS]: false,
        [TYPE.OPTIONS.PATH_IMAGE]: null,
        [TYPE.OPTIONS.FILE_FORMATS]: ['mp3'],
        [TYPE.OPTIONS.GLOB]: null,
        [TYPE.OPTIONS.PARSE_STRICT]: false
      }
    },
    CACHE: {
      [TYPE.CONFIG.PLAYER]: {
        volume: 1,
        autoplay: true,
        muted: false
      },
      [TYPE.CONFIG.DIMENSIONS]: {
        width: 640,
        height: 480
      },
      [TYPE.CONFIG.POSITION]: {
        x: 0,
        y: 0
      }
    }
  }
};
