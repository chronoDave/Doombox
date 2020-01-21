import React from 'react';

// Icon
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK, STATUS } from '../../utils/const';

const IconButtonPlay = ({ ...rest }) => {
  const { pause } = useAudio(HOOK.AUDIO.METHOD);
  const { status } = useAudio(HOOK.AUDIO.PLAYER);

  return (
    <IconButton
      onClick={() => pause()}
      color="inherit"
      {...rest}
    >
      {status === STATUS.AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
    </IconButton>
  );
};

export default IconButtonPlay;
