import React, { useMemo, useState } from 'react';

// Core
import {
  Box,
  Slider
} from '@material-ui/core';

import { useAudio } from '../../Audio';
import { Typography } from '../../Typography';

// Utils
import { formatTime } from '../../../utils';

// Style
import { useSidebarPlayerStyle } from './SidebarPlayer.style';

const SidebarPlayerSlider = () => {
  const {
    position,
    duration,
    seek,
    requestFrame
  } = useAudio();
  const classes = useSidebarPlayerStyle();

  return useMemo(() => (
    <Box display="flex" flexDirection="column">
      <Slider
        value={position || 0}
        max={duration || 100}
        classes={{
          root: classes.sliderRoot,
          thumb: classes.sliderThumb,
          valueLabel: classes.sliderValueLabel
        }}
        onChange={(event, value) => seek(value)}
        onChangeCommitted={() => requestFrame()}
        valueLabelDisplay="auto"
        valueLabelFormat={value => formatTime(value || 0)}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="caption">
          {formatTime(position || 0)}
        </Typography>
        <Typography variant="caption">
          {`-${formatTime(Math.round(duration - position) || 0)}`}
        </Typography>
      </Box>
    </Box>
  ), [position, duration, seek, requestFrame]);
};

export default SidebarPlayerSlider;
