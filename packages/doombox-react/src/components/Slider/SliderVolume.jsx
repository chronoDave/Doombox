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
import { AUDIO_HOOKS } from '../../utils/const';

const SliderVolume = ({ width }) => {
  const volume = useAudio(AUDIO_HOOKS.VOLUME);
  const { setVolume } = useAudio(AUDIO_HOOKS.METHOD);

  return (
    <Box display="flex" width={width}>
      <Typography>
        {Math.round(volume * 100)}
      </Typography>
      <Slider
        value={volume}
        max={1}
        step={0.01}
        onChange={(event, value) => setVolume(value)}
        valueLabelDisplay="auto"
        valueLabelFormat={value => Math.round(value * 100)}
      />
    </Box>
  );
};

SliderVolume.propTypes = {
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

SliderVolume.defaultProps = {
  width: '100%'
};

export default SliderVolume;
