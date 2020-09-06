import React from 'react';

// Icons
import IconNext from '@material-ui/icons/SkipNext';
import IconPrevious from '@material-ui/icons/SkipPrevious';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import { Box } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

import {
  IconButton,
  IconButtonPlay
} from '../../components';

// Styles
import { usePlayerStyles } from './Player.style';

const PlayerButtons = () => {
  const {
    next,
    previous,
    shuffle
  } = useAudio();
  const classes = usePlayerStyles();

  return (
    <Box display="flex" justifyContent="center">
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={previous}
      >
        <IconPrevious />
      </IconButton>
      <IconButtonPlay
        square
        classes={{ root: classes.iconButtonRoot }}
      />
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={next}
      >
        <IconNext />
      </IconButton>
      <IconButton
        square
        classes={{ root: classes.iconButtonRoot }}
        onClick={shuffle}
      >
        <IconShuffle />
      </IconButton>
    </Box>
  );
};

export default PlayerButtons;
