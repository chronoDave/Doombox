import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

// Style
import { SidebarStyles } from './Sidebar.style';

const Sidebar = ({ classes }) => (
  <div className={classes.root}>Sidebar</div>
);

Sidebar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired
  }).isRequired
};

export default withStyles(SidebarStyles)(Sidebar);
