import React from 'react';

// Icons
import IconStop from '@material-ui/icons/Stop';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonStop = () => {
  const { stop } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton onClick={() => stop()}>
      <IconStop />
    </IconButton>
  );
};

export default IconButtonStop;
