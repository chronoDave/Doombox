import React from 'react';

// Icons
import IconNext from '@material-ui/icons/SkipNext';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonNext = ({ ...rest }) => {
  const { next } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      onClick={() => next()}
      color="inherit"
      {...rest}
    >
      <IconNext />
    </IconButton>
  );
};

export default IconButtonNext;
