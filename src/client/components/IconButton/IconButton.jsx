import React, { forwardRef, Children, cloneElement } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { IconButton as MuiIconButton } from '@material-ui/core';

// Styles
import { useIconButtonStyles } from './IconButton.style';

const IconButton = forwardRef((props, ref) => {
  const {
    square,
    small,
    className,
    children,
    ...rest
  } = props;
  const classes = useIconButtonStyles();

  return (
    <MuiIconButton
      className={clsx(
        { [classes.square]: square },
        { [classes.small]: small },
        className
      )}
      {...rest}
      ref={ref}
    >
      {Children.map(children, child => cloneElement(child, {
        className: clsx({ [classes.iconSmall]: small })
      }))}
    </MuiIconButton>
  );
});

IconButton.defaultProps = {
  className: null,
  square: false,
  small: false
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  square: PropTypes.bool,
  small: PropTypes.bool
};

export default IconButton;
