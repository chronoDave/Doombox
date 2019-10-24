import React from 'react';

// Core
import { Box } from '@material-ui/core';

// Modules
import {
  PlaylistImage,
  PlaylistTable,
  PlaylistDescription
} from '../../../modules/Playlist';

// Template
import { MainViewTemplate } from '../../../templates';

const PlaylistView = () => (
  <MainViewTemplate
    title={{ key: 'title:playlist' }}
    subtitle="Current song:"
  >
    <Box display="flex" height="100%">
      <Box
        display="flex"
        flexDirection="column"
        mr={2}
      >
        <PlaylistImage />
        <PlaylistDescription />
      </Box>
      <PlaylistTable />
    </Box>
  </MainViewTemplate>
);

export default PlaylistView;
