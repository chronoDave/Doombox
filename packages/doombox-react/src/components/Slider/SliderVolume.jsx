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
import { HOOK } from '../../utils/const';

const SliderVolume = ({ width }) => {
  const volume = useAudio(HOOK.AUDIO.VOLUME);
  const { setVolume } = useAudio(HOOK.AUDIO.METHOD);

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
