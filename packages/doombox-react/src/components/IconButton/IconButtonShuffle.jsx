import React from 'react';

// Icons
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonShuffle = ({ ...rest }) => {
  const { shuffle } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      onClick={() => shuffle()}
      color="inherit"
      {...rest}
    >
      <ShuffleIcon />
    </IconButton>
  );
};

export default IconButtonShuffle;
