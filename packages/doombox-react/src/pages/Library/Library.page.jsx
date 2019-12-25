import React from 'react';

// Core
import { Box } from '@material-ui/core';

// Modules
import {
  VirtualLibrary,
  SearchBarLibrary
} from '../../modules';

const LibraryPage = () => {
  return (
    <Box pl={1} width="100%" height="100%">
      <SearchBarLibrary />
      <VirtualLibrary />
    </Box>
  );
};

export default LibraryPage;
