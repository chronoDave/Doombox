import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Slider,
  Typography
} from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { formatTime } from '../../utils';
import { HOOK } from '../../utils/const';

const SliderPlayer = ({ width }) => {
  const position = useAudio(HOOK.AUDIO.POSITION);
  const { duration } = useAudio(HOOK.AUDIO.CURRENT);
  const { seek, requestFrame } = useAudio(HOOK.AUDIO.METHOD);

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
