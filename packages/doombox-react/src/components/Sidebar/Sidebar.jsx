import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

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
      Content
    </Drawer>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(
  SidebarStyle
)(Sidebar);
