import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { AppBar } from '../AppBar';
import { Player } from '../Player';
import { Playlist } from '../Playlist';
import { Library } from '../Library';

// Utils
import { isMac } from '../../../../doombox-utils';

const App = () => (
  <Box
    display="flex"
    flexDirection="column"
    overflow="hidden"
    maxHeight="100vh"
  >
    {!isMac && <AppBar />}
    <Box display="flex" minHeight={0}>
      <Box display="flex" flexDirection="column">
        <Player />
        <Playlist />
      </Box>
      <Library />
    </Box>
  </Box>
);

export default App;
