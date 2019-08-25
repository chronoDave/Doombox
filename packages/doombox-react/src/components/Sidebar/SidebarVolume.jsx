import React, { useMemo } from 'react';

// Icons
import IconVolume0 from '@material-ui/icons/VolumeOff';
import IconVolume1 from '@material-ui/icons/VolumeMute';
import IconVolume2 from '@material-ui/icons/VolumeDown';
import IconVolume3 from '@material-ui/icons/VolumeUp';

// Core
import {
  Box,
  IconButton,
  Slider
} from '@material-ui/core';

import { useAudio } from '../Audio';
import { Typography } from '../Typography';

// Style
import { useSidebarStyle } from './Sidebar.style';

const getVolumeIcon = volume => {
  if (volume <= 33) return <IconVolume1 />;
  if (volume <= 66) return <IconVolume2 />;
  return <IconVolume3 />;
};

const SidebarVolume = () => {
  const {
    volume,
    setVolume,
    mute,
    muted
  } = useAudio();
  const classes = useSidebarStyle();

  return useMemo(() => (
    <Box display="flex" alignItems="center" width="100%">
      <IconButton
        onClick={() => mute()}
        classes={{ root: classes.button }}
      >
        {muted ? <IconVolume0 /> : getVolumeIcon(volume)}
      </IconButton>
      <Typography variant="caption">
        {muted ? 0 : volume}
      </Typography>
      <Box px={2} width="100%" display="flex" alignItems="center">
        <Slider
          value={muted ? 0 : volume}
          onChange={(event, newValue) => !muted && setVolume(newValue)}
          valueLabelDisplay="auto"
          classes={{ thumb: classes.sliderThumb }}
        />
      </Box>
    </Box>
  ), [volume, mute, muted, setVolume]);
};

export default SidebarVolume;
