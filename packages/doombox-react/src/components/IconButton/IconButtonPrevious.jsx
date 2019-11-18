import React from 'react';

// Icons
import IconPrevious from '@material-ui/icons/SkipPrevious';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

const IconButtonPrevious = () => {
  const { previous } = useAudio(AUDIO_HOOKS.METHOD);

  return (
    <IconButton onClick={() => previous()}>
      <IconPrevious />
    </IconButton>
  );
};

export default IconButtonPrevious;
