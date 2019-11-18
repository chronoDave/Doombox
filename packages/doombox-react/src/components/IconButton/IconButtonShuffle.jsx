import React from 'react';

// Icons
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

const IconButtonShuffle = () => {
  const { shuffle } = useAudio(AUDIO_HOOKS.METHOD);

  return (
    <IconButton onClick={() => shuffle()}>
      <ShuffleIcon />
    </IconButton>
  );
};

export default IconButtonShuffle;
