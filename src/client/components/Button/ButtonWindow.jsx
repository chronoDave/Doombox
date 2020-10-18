import React from 'react';
import clsx from 'clsx'
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '@material-ui/core';

// Styles
import { useButtonStyles } from './Button.style';

const ButtonWindow = props => {
  const {
    active,
    className,
    children,
    ...rest
  } = props;
  const classes = useButtonStyles();

  return (
    <ButtonBase
      {...rest}
      classes={{ root: classes.window }}
      className={clsx({
        [classes.windowActive]: active
      }, className)}
      disableRipple
      disableTouchRipple
    >
      {children}
    </ButtonBase>
  );
};

ButtonWindow.defaultProps = {
  className: null,
  active: false
};

ButtonWindow.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ButtonWindow;
