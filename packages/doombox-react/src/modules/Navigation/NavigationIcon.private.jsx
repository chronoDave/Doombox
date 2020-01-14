import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

// Styles
import { useNavigationStyles } from './Navigation.style';

const NavigationButton = ({ active, icon, onClick }) => {
  const classes = useNavigationStyles();

  return (
    <Box
      display="flex"
      flexDirection="space-between"
      height="100%"
    >
      {active && <div className={classes.active} />}
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Box>
  );
};

NavigationButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

NavigationButton.defaultProps = {
  active: false
};

export default NavigationButton;
