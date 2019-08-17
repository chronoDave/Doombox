import React from 'react';

// Core
import { Box } from '@material-ui/core';

import { Divider } from '../../Divider';

import SidebarPlayerCover from './SidebarPlayerCover';
import SidebarPlayerText from './SidebarPlayerText';
import SidebarPlayerSlider from './SidebarPlayerSlider';

const SidebarPlayer = () => (
  <Box display="flex" flexDirection="column" width="100%">
    <Box px={0.5} py={1.5}>
      <Box display="flex">
        <SidebarPlayerCover />
        <SidebarPlayerText />
      </Box>
      <SidebarPlayerSlider />
    </Box>
    <Divider my={0} />
  </Box>
);

export default SidebarPlayer;
