import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Box
} from '@material-ui/core';

import { SidebarItemUser } from './SidebarItem';
import { Logo } from '../Logo';
import { Typography } from '../Typography';
import { Divider } from '../Divider';

// Style
import SidebarStyle from './SidebarStyle';

const Sidebar = props => {
  const { classes } = props;

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

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(
  SidebarStyle
)(Sidebar);
