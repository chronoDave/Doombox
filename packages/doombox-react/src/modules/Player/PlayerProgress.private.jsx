import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components';

// Utils
import { formatTime } from '../../../../doombox-utils';

const PlayerProgress = ({ duration, position }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="body2">
      {formatTime(position)}
    </Typography>
    <Typography variant="body2">
      {`-${formatTime(duration - position)}`}
    </Typography>
  </Box>
);

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
