import React from 'react';

// Core
import {
  Box,
  Divider
} from '@material-ui/core';

// Modules
import {
  Player,
  Playlist,
  Navigation,
  Collection
} from '../../modules';

// Style
import { useSidebarStyles } from './Sidebar.style';

const Sidebar = () => {
  const classes = useSidebarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.tab}>
        <Navigation />
        <Box my={0.5} mx={1}>
          <Divider />
        </Box>
        <Collection />
      </div>
      <div className={classes.panel}>
        <Player />
        <Playlist />
      </div>
    </div>
  );
};

export default Sidebar;
