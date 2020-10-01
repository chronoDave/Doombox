import React from 'react';

// Core
import { Box } from '@material-ui/core';

import PlayerMetadata from './PlayerMetadata.private';
import PlayerProgress from './PlayerProgress.private';
import PlayerButtons from './PlayerButtons.private';

const Player = () => (
  <Box display="flex" flexDirection="column">
    <PlayerMetadata />
    <PlayerProgress />
    <PlayerButtons />
  </Box>
);

export default Player;
