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
import { AUDIO } from '../../utils/const';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarButtons = () => {
  const {
    play,
    pause,
    previous,
    next,
    shuffle,
    status
  } = useAudio();
  const classes = useSidebarStyle();

  return useMemo(() => (
    <Box
      display="flex"
      justifyContent="space-around"
      wrap="nowrap"
      flexGrow={1}
      py={1}
    >
      <IconButton
        onClick={() => previous()}
        classes={{ root: classes.button }}
      >
        <IconPrevious />
      </IconButton>
      <IconButton
        onClick={() => (status === AUDIO.PLAYING ? pause() : play())}
        classes={{ root: classes.button }}
      >
        {status === AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
      </IconButton>
      <IconButton
        onClick={() => next()}
        classes={{ root: classes.button }}
      >
        <IconNext />
      </IconButton>
      <IconButton
        onClick={() => shuffle()}
        classes={{ root: classes.button }}
      >
        <IconShuffle />
      </IconButton>
    </Box>
  ), [status]);
};

export default SidebarButtons;
