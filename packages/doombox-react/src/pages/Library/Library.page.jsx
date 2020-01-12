import React from 'react';

// Core
import { Box } from '@material-ui/core';

// Modules
import {
  VirtualLibrary,
  SearchLibrary
} from '../../modules';

const LibraryPage = () => {
  return (
    <Box
      pl={1}
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <SearchLibrary />
      <Box flexGrow={1}>
        <VirtualLibrary />
      </Box>
    </Box>
  );
};

export default LibraryPage;
