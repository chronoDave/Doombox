import React from 'react';

// Core
import {
  Box,
  Drawer
} from '@material-ui/core';

import { Logo } from '../../components/Logo';

import SidebarButtons from './SidebarButtons';
import SidebarPlaylist from './SidebarPlaylist';

// Style
import { useSidebarStyle } from './Sidebar.style';

const Sidebar = () => {
  const classes = useSidebarStyle();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.paper }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={1}
      >
        <Box py={0.5} color="grey.200" borderBottom={1}>
          <Logo size={6} />
        </Box>
        <SidebarButtons py={0.5} color="grey.200" borderBottom={1} />
        <SidebarPlaylist py={0.5} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
