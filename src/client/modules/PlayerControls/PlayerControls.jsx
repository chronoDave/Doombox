import React from 'react';
import { connect } from 'react-redux';

// Icons
import IconNext from '@material-ui/icons/SkipNext';
import IconPrevious from '@material-ui/icons/SkipPrevious';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import { Box, useMediaQuery } from '@material-ui/core';

import {
  IconButton,
  IconButtonPlay,
  IconButtonVolume
} from '../../components';

// Hooks
import { useAudio } from '../../hooks';

const PlayerControls = () => {
  const { next, previous, shuffle } = useAudio();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));

  return (
    <Box display="flex" justifyContent={{ xs: 'space-around', sm: 'center' }}>
      <IconButtonVolume square small={isSmall} />
      <IconButton square small={isSmall} onClick={previous}>
        <IconPrevious />
      </IconButton>
      <IconButtonPlay square small={isSmall} />
      <IconButton square small={isSmall} onClick={next}>
        <IconNext />
      </IconButton>
      <IconButton square small={isSmall} onClick={shuffle}>
        <IconShuffle />
      </IconButton>
    </Box>
  );
};

const mapStateToProps = state => ({
  volume: state.player.volume,
  status: state.player.status
});

export default connect(
  mapStateToProps
)(PlayerControls);
