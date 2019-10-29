import React from 'react';

// Core
import {
  Box,
  Drawer
} from '@material-ui/core';

import SidepanelPlayer from './SidepanelPlayer';

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
        <SidepanelPlayer />
      </Box>
    </Drawer>
  );
};

export default Sidepanel;
