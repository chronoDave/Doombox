import React from 'react';

// Core
import {
  Box,
  Drawer
} from '@material-ui/core';

import { Player } from '../Player';
import { Playlist } from '../Playlist';

// Style
import { useSidepanelStyle } from './Sidepanel.style';

const Sidepanel = () => {
  const classes = useSidepanelStyle();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{
        paper: classes.paper,
        paperAnchorLeft: classes.paperAnchorLeft
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={2}
      >
        <Player />
        <Playlist pt={2} />
      </Box>
    </Drawer>
  );
};

export default Sidepanel;
