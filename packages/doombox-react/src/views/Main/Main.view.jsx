import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { Player, Playlist, Library } from '../../modules';

const MainView = () => (
  <Box display="flex" minHeight={0}>
    <Box display="flex" flexDirection="column">
      <Player />
      <Playlist />
    </Box>
    <Library />
  </Box>
);

export default MainView;
