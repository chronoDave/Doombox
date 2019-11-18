import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Slider,
  Typography
} from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { formatTime } from '../../utils';
import { AUDIO_HOOKS } from '../../utils/const';

const SliderPlayer = ({ width }) => {
  const position = useAudio(AUDIO_HOOKS.POSITION);
  const { duration } = useAudio(AUDIO_HOOKS.CURRENT);
  const { seek, requestFrame } = useAudio(AUDIO_HOOKS.METHOD);

  return (
    <Box display="flex" flexDirection="column" width={width}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption">
          {formatTime(Math.round(position))}
        </Typography>
        <Typography variant="caption">
          {`-${formatTime(Math.round(duration) - Math.round(position))}`}
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
