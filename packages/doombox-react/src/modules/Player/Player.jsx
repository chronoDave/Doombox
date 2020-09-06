import React from 'react';

// Core
import { Box } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

import PlayerMetadata from './PlayerMetadata.private';
import PlayerProgress from './PlayerProgress.private';
import PlayerButtons from './PlayerButtons.private';

const Player = () => {
  const { add } = useAudio();

  const handleDebug = () => {
    const file = 'D:/Users/David/Music/Temp Music/#LIVESETS/Ayase Chihaya Radio Ensemble/[2014] Ayase Radio Ensemble 1/Lulickma.mp3';

    add({
      file,
      format: {
        container: 'mp3'
      },
      artist: 'Lulicka',
      title: 'LLLL Mix (ACRE)'
    });
  };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <PlayerMetadata />
      <PlayerProgress />
      <PlayerButtons />
    </Box>
  );
};

export default Player;
