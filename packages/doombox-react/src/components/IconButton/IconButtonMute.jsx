import React from 'react';

// Icons
import MuteIcon from '@material-ui/icons/VolumeOff';
import VolumeLowIcon from '@material-ui/icons/VolumeMute';
import VolumeMediumIcon from '@material-ui/icons/VolumeDown';
import VolumeHighIcon from '@material-ui/icons/VolumeUp';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks/useContext';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonMute = () => {
  const { mute } = useAudio(HOOK.AUDIO.METHOD);
  const { muted } = useAudio(HOOK.AUDIO.CURRENT);
  const volume = useAudio(HOOK.AUDIO.VOLUME);

  const getIcon = () => {
    if (volume <= 0 || muted) return <MuteIcon />;
    if (volume <= 0.33) return <VolumeLowIcon />;
    if (volume <= 0.66) return <VolumeMediumIcon />;
    return <VolumeHighIcon />;
  };

  return (
    <IconButton onClick={() => mute()}>
      {getIcon()}
    </IconButton>
  );
};

export default IconButtonMute;
