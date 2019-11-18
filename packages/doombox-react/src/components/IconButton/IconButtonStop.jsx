import React from 'react';

// Icons
import IconStop from '@material-ui/icons/Stop';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

const IconButtonStop = () => {
  const { stop } = useAudio(AUDIO_HOOKS.METHOD);

  return (
    <IconButton onClick={() => stop()}>
      <IconStop />
    </IconButton>
  );
};

export default IconButtonStop;
