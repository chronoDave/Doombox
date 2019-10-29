import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components/Typography';
import { Slider } from '../../components/Slider';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { formatTime } from '../../utils';
import { AUDIO_HOOKS } from '../../utils/const';

const SidepanelProgress = () => {
  const { duration, position } = useAudio(AUDIO_HOOKS.POSITION);
  const { seek, requestFrame } = useAudio(AUDIO_HOOKS.STATIC);

  return (
    <Box display="flex" flexDirection="column" width="100%">
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
        max={duration}
        onChange={(event, value) => seek(value)}
        onChangeCommitted={() => requestFrame()}
        valueLabelDisplay="auto"
        valueLabelFormat={value => formatTime(value)}
      />
    </Box>
  );
};

export default SidepanelProgress;
