import React, { useEffect } from 'react';
import { connect } from 'react-redux';

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
import { AUDIO } from '../../const';

const SidebarPlayer = ({ library }) => {
  const {
    set,
    play,
    pause,
    previous,
    current,
    position,
    next,
    shuffle,
    state
  } = useAudio();

  useEffect(() => {
    if (library) set(library.slice(0, 10));
  }, [library]);

  const handlePlay = () => {
    if (state === AUDIO.PLAYING) return pause();
    return play();
  };

  console.log(position);

  return (
    <Box>
      <IconButton onClick={() => previous()}>
        <IconPrevious />
      </IconButton>
      <IconButton onClick={handlePlay}>
        {state === AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
      </IconButton>
      <IconButton onClick={() => next()}>
        <IconNext />
      </IconButton>
      <IconButton onClick={() => shuffle()}>
        <IconShuffle />
      </IconButton>
    </Box>
  );
};

const mapStateToProps = state => ({
  library: state.library.collection
});

export default connect(
  mapStateToProps
)(SidebarPlayer);
