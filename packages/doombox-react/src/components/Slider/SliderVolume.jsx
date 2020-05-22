import React from 'react';
import PropTypes from 'prop-types';

// Icons
import MuteIcon from '@material-ui/icons/VolumeOff';
import VolumeLowIcon from '@material-ui/icons/VolumeMute';
import VolumeMediumIcon from '@material-ui/icons/VolumeDown';
import VolumeHighIcon from '@material-ui/icons/VolumeUp';

// Core
import {
  Box,
  Slider,
  IconButton
} from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const SliderVolume = ({ width }) => {
  const volume = useAudio(HOOK.AUDIO.VOLUME);
  const { muted } = useAudio(HOOK.AUDIO.PLAYER);
  const { setVolume, mute } = useAudio(HOOK.AUDIO.METHOD);

  const getIcon = () => {
    if (volume <= 0 || muted) return <MuteIcon />;
    if (volume <= 0.33) return <VolumeLowIcon />;
    if (volume <= 0.66) return <VolumeMediumIcon />;
    return <VolumeHighIcon />;
  };

  return (
    <Box
      display="flex"
      width={width}
      alignItems="center"
    >
      <IconButton onClick={mute}>
        {getIcon()}
      </IconButton>
      <Slider
        value={volume}
        max={1}
        step={0.01}
        onChange={(event, value) => setVolume(value)}
        valueLabelDisplay="auto"
        valueLabelFormat={value => `${Math.round(value * 100)}%`}
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
