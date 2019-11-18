import {
  useEffect,
  useMemo
} from 'react';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import {
  AUDIO_HOOKS,
  AUDIO_STATUS
} from '../../utils/const';
import {
  COMMANDS_AUDIO,
  TYPES_IPC
} from '../../../../doombox-utils/const';

const { ipcRenderer } = window.require('electron');

const KeybindListener = ({ children }) => {
  const {
    next,
    previous,
    play,
    increaseVolume,
    decreaseVolume,
    pause,
    mute
  } = useAudio(AUDIO_HOOKS.METHOD);
  const { status } = useAudio(AUDIO_HOOKS.CURRENT);

  useEffect(() => {
    ipcRenderer.on(TYPES_IPC.KEYBOARD, (event, command) => {
      switch (command) {
        case COMMANDS_AUDIO.NEXT: return next();
        case COMMANDS_AUDIO.PREVIOUS: return previous();
        case COMMANDS_AUDIO.PLAY: return status !== AUDIO_STATUS.PLAYING ? play() : pause();
        case COMMANDS_AUDIO.PAUSE: return pause();
        case COMMANDS_AUDIO.VOLUME_UP: return increaseVolume();
        case COMMANDS_AUDIO.VOLUME_DOWN: return decreaseVolume();
        case COMMANDS_AUDIO.MUTE: return mute();
        default: return null;
      }
    });

    // Cleanup
    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, [status]);

  return useMemo(() => children, []);
};

export default KeybindListener;
