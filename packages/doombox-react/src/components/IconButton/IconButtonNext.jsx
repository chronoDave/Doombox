import React from 'react';

// Icons
import IconNext from '@material-ui/icons/SkipNext';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

const IconButtonNext = () => {
  const { next } = useAudio(AUDIO_HOOKS.METHOD);

  return (
    <IconButton onClick={() => next()}>
      <IconNext />
    </IconButton>
  );
};

export default IconButtonNext;
