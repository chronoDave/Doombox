import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase as MuiButtonBase } from '@material-ui/core';

// Styles
import { useButtonStyles } from './Button.style';

const ButtonBase = ({ children, ...rest }) => {
  const classes = useButtonStyles();

  return (
    <MuiButtonBase
      classes={{ root: classes.baseRoot }}
      {...rest}
    >
      {children}
    </MuiButtonBase>
  );
};

ButtonBase.propTypes = {
  children: PropTypes.node.isRequired
};

export default ButtonBase;
