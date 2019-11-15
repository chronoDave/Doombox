import React, { useMemo } from 'react';

// Icon
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';
import IconNext from '@material-ui/icons/SkipNext';
import IconPrevious from '@material-ui/icons/SkipPrevious';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import {
  AUDIO_HOOKS,
  AUDIO_STATUS
} from '../../utils/const';

// Style
import { usePlayerStyle } from './Player.style';

const PlayerButtons = () => {
  const {
    play,
    pause,
    previous,
    next,
    shuffle,
  } = useAudio(AUDIO_HOOKS.STATIC);
  const { status } = useAudio(AUDIO_HOOKS.CURRENT);
  const classes = usePlayerStyle();

  return useMemo(() => (
    <Box
      display="flex"
      wrap="nowrap"
      marginTop={-1}
      marginBottom={-1.5}
    >
      <IconButton
        onClick={() => previous()}
        classes={{ root: classes.iconButtonRoot }}
      >
        <IconPrevious />
      </IconButton>
      <IconButton
        onClick={() => (status === AUDIO_STATUS.PLAYING ? pause() : play())}
        classes={{ root: classes.iconButtonRoot }}
      >
        {status === AUDIO_STATUS.PLAYING ? <IconPause /> : <IconPlay />}
      </IconButton>
      <IconButton
        onClick={() => next()}
        classes={{ root: classes.iconButtonRoot }}
      >
        <IconNext />
      </IconButton>
      <IconButton
        onClick={() => shuffle()}
        classes={{ root: classes.iconButtonRoot }}
      >
        <IconShuffle />
      </IconButton>
    </Box>
  ), [play, pause, previous, next, shuffle, status]);
};

export default PlayerButtons;
