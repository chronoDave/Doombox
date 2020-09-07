import React, { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { IconButton as MuiIconButton } from '@material-ui/core';

// Styles
import { useIconButtonStyles } from './IconButton.style';

const IconButton = forwardRef((props, ref) => {
  const {
    square,
    className,
    children,
    ...rest
  } = props;
  const classes = useIconButtonStyles();

  return (
    <MuiIconButton
      className={clsx(
        { [classes.square]: square },
        className
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </MuiIconButton>
  );
});

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  square: PropTypes.bool
};

IconButton.defaultProps = {
  className: null,
  square: false
};

export default IconButton;