import React from 'react';

// Core
import {
  Box,
  Divider
} from '@material-ui/core';

// Modules
import {
  Player,
  Playlist
} from '../../modules';

// Style
import { useSidebarStyles } from './Sidebar.style';

import SidebarNavigation from './SidebarNavigation.private';
import SidebarCollection from './SidebarCollection.private';

const Sidebar = () => {
  const classes = useSidebarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.tab}>
        <SidebarNavigation />
        <Box my={0.5} mx={1}>
          <Divider />
        </Box>
        <SidebarCollection />
      </div>
      <div className={classes.panel}>
        <Player />
        <Playlist />
      </div>
    </div>
  );
};

export default Sidebar;
