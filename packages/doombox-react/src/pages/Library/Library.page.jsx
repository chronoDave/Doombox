import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { BackgroundAlbum } from '../../components';

// Modules
import {
  VirtualLibrary,
  MenuLibrary
} from '../../modules';

const LibraryPage = () => (
  <Box
    pl="1px"
    width="100%"
    height="100%"
    display="flex"
    flexDirection="column"
  >
    <BackgroundAlbum />
    <MenuLibrary />
    <Box flexGrow={1}>
      <VirtualLibrary />
    </Box>
  </Box>
);

export default LibraryPage;
