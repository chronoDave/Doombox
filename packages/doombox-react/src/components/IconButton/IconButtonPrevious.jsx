import React from 'react';

// Icons
import IconPrevious from '@material-ui/icons/SkipPrevious';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonPrevious = ({ ...rest }) => {
  const { previous } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      onClick={() => previous()}
      color="inherit"
      {...rest}
    >
      <IconPrevious />
    </IconButton>
  );
};

export default IconButtonPrevious;
