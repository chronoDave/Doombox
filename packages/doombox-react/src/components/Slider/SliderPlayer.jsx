import React from 'react';
import PropTypes from 'prop-types';

// Core
import { useTheme } from '@material-ui/core/styles';
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

const SliderPlayer = ({ width }) => {
  const position = useAudio(HOOK.AUDIO.POSITION);
  const { duration } = useAudio(HOOK.AUDIO.PLAYER);
  const { seek, requestFrame } = useAudio(HOOK.AUDIO.METHOD);
  const { isDarkTheme } = useTheme();

  return (
    <Box display="flex" flexDirection="column" width={width}>
      <Box
        display="flex"
        justifyContent="space-between"
        color={isDarkTheme ? 'text.primary' : 'grey.50'}
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
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

SliderPlayer.defaultProps = {
  width: '100%'
};

export default SliderPlayer;
