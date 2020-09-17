import React from 'react';
import { connect } from 'react-redux';
import { formatTime } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Box, Slider } from '@material-ui/core';

import { Typography } from '../../components';

// Hooks
import { useAudio } from '../../hooks';

const PlayerProgress = ({ duration, position }) => {
  const { seek } = useAudio();

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between">
        <Typography>
          {formatTime(position)}
        </Typography>
        <Typography>
          {`-${formatTime(duration - position)}`}
        </Typography>
      </Box>
      <Slider
        value={position}
        max={duration}
        onChange={(_, value) => seek(value)}
      />
    </Box>
  );
};

PlayerProgress.propTypes = {
  position: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  position: state.player.position,
  duration: state.player.duration
});

export default connect(
  mapStateToProps
)(PlayerProgress);
