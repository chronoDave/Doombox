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

import { useAudio } from '../Audio';

// Const
import { AUDIO } from '../../constants';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarButtons = ({ ...rest }) => {
  const {
    play,
    pause,
    previous,
    next,
    shuffle,
    state
  } = useAudio();
  const classes = useSidebarStyle();

  return useMemo(() => {
    const handlePlay = () => {
      if (state === AUDIO.PLAYING) return pause();
      return play();
    };

    return (
      <Box
        display="flex"
        justifyContent="space-around"
        width="100%"
        wrap="nowrap"
        {...rest}
      >
        <IconButton
          onClick={() => previous()}
          classes={{ root: classes.button }}
        >
          <IconPrevious />
        </IconButton>
        <IconButton
          onClick={handlePlay}
          classes={{ root: classes.button }}
        >
          {state === AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
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
    );
  }, [state]);
};

export default SidebarButtons;
