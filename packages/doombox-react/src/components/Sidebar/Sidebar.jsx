import React from 'react';

// Core
import {
  Drawer,
  Box
} from '@material-ui/core';

import { SidebarItemUser } from './SidebarItem';
import { Logo } from '../Logo';
import { Typography } from '../Typography';
import { Divider } from '../Divider';

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
        maxHeight="100vh"
      >
        <Box
          p={2}
          pb={0}
          display="flex"
          alignItems="center"
          flexDirection="column"
          flexGrow={1}
          height="100vh"
        >
          <Logo />
          <Typography variant="h6">Doombox</Typography>
          <Divider />
        </Box>
        <Box p={1} bgcolor="grey.500">
          <SidebarItemUser />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
