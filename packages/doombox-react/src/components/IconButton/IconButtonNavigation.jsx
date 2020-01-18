import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

// Styles
import { useIconButtonStyles } from './IconButton.style';

const IconButtonNavigation = ({ active, icon, ...rest }) => {
  const classes = useIconButtonStyles();

  return (
    <Box
      display="flex"
      flexDirection="space-between"
      height="100%"
    >
      {active && <div className={classes.active} />}
      <IconButton
        classes={{ root: classes.root }}
        {...rest}
      >
        {icon}
      </IconButton>
    </Box>
  );
};

IconButtonNavigation.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

IconButtonNavigation.defaultProps = {
  active: false
};

export default IconButtonNavigation;
