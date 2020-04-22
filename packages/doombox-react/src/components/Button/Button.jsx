import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  Button as MuiButton,
  CircularProgress
} from '@material-ui/core';

// Utils
import { MUI } from '../../utils/const';

// Styles
import { useButtonStyles } from './Button.style';

const Button = forwardRef((props, ref) => {
  const {
    color,
    loading,
    disabled,
    variant,
    lowercase,
    children,
    ...rest
  } = props;
  const classes = useButtonStyles({ color });

  return (
    <MuiButton
      disabled={disabled || loading}
      variant={variant}
      color={MUI.COLORS.includes(color) ? color : 'default'}
      classes={{
        root: clsx(
          classes.variant,
          classes[variant],
          { [classes.lowercase]: lowercase }
        )
      }}
      {...rest}
      ref={ref}
    >
      {loading ? (
        <CircularProgress
          className={clsx({
            [classes.progressWhite]: color === 'primary' || color === 'secondary'
          })}
          size={24}
        />
      ) : children}
    </MuiButton>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf([
    'text',
    'outlined',
    'contained'
  ]),
  color: PropTypes.oneOf([
    'default',
    'inherit',
    'primary',
    'secondary',
    'error',
    'warning',
    'success',
    'info'
  ]),
  lowercase: PropTypes.bool
};

Button.defaultProps = {
  disabled: false,
  variant: 'text',
  color: 'default',
  loading: false,
  lowercase: false
};

export default Button;
