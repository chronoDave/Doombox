import React from 'react';
import { connect } from 'react-redux';
import { TYPE } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Slider
} from '@material-ui/core';

import { Typography } from '../Typography';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { formatTime } from '../../utils';
import { HOOK } from '../../utils/const';

const SliderPlayer = ({ darkTheme, width }) => {
  const position = useAudio(HOOK.AUDIO.POSITION);
  const { duration } = useAudio(HOOK.AUDIO.PLAYER);
  const { seek, requestFrame } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <Box display="flex" flexDirection="column" width={width}>
      <Box
        display="flex"
        justifyContent="space-between"
        color={darkTheme ? 'text.primary' : 'grey.50'}
      >
        <Typography variant="caption" color="inherit">
          {formatTime(Math.round(position || 0))}
        </Typography>
        <Typography variant="caption" color="inherit">
          {`-${formatTime(Math.round(duration || 0) - Math.round(position || 0))}`}
        </Typography>
      </Box>
      <Slider
        value={position}
        max={duration === 0 ? 0.1 : duration}
        onChange={(event, value) => seek(value)}
        onChangeCommitted={() => requestFrame()}
        valueLabelDisplay="auto"
        valueLabelFormat={value => formatTime(value)}
      />
    </Box>
  );
};

SliderPlayer.propTypes = {
  darkTheme: PropTypes.bool,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

SliderPlayer.defaultProps = {
  darkTheme: false,
  width: '100%'
};

const mapStateToProps = state => ({
  darkTheme: state.config[TYPE.CONFIG.PALETTE].darkTheme
});

export default connect(
  mapStateToProps
)(SliderPlayer);
