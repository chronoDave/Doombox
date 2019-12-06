import React from 'react';

// Icon
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { HOOK, STATUS } from '../../utils/const';

const IconButtonPlay = () => {
  const { play, pause } = useAudio(HOOK.AUDIO.METHOD);
  const { status } = useAudio(HOOK.AUDIO.CURRENT);

  return (
    <IconButton onClick={() => (status === STATUS.AUDIO.PLAYING ? pause() : play())}>
      {status === STATUS.AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
    </IconButton>
  );
};

export default IconButtonPlay;
