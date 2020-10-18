import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { ButtonBase as MuiButtonBase } from '@material-ui/core';

// Styles
import { useButtonStyles } from './Button.style';

const ButtonBase = ({ children, className, ...rest }) => {
  const classes = useButtonStyles();

  return (
    <MuiButtonBase
      className={clsx(classes.baseRoot, className)}
      {...rest}
    >
      {children}
    </MuiButtonBase>
  );
};

ButtonBase.defaultProps = {
  className: ''
};

ButtonBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ButtonBase;
