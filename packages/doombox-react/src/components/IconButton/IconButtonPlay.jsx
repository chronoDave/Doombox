import React from 'react';

// Icon
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import {
  AUDIO_HOOKS,
  AUDIO_STATUS
} from '../../utils/const';

const IconButtonPlay = () => {
  const { play, pause } = useAudio(AUDIO_HOOKS.METHOD);
  const { status } = useAudio(AUDIO_HOOKS.CURRENT);

  return (
    <IconButton onClick={() => (status === AUDIO_STATUS.PLAYING ? pause() : play())}>
      {status === AUDIO_STATUS.PLAYING ? <IconPause /> : <IconPlay />}
    </IconButton>
  );
};

export default IconButtonPlay;
