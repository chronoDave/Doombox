import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Drawer,
  Box
} from '@material-ui/core';

import { SidebarItemUser } from '../SidebarItem';
import { Logo } from '../Logo';

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
        p={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Logo />
        <SidebarItemUser />
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
