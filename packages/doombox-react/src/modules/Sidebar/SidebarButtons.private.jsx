import React from 'react';

// Core
import { Box } from '@material-ui/core';

import {
  IconButtonPrevious,
  IconButtonPlay,
  IconButtonNext,
  IconButtonShuffle
} from '../../components';

const SidebarButtons = () => (
  <Box display="flex">
    <IconButtonPrevious />
    <IconButtonPlay />
    <IconButtonNext />
    <IconButtonShuffle />
  </Box>
);

export default SidebarButtons;
