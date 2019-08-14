import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  Box,
  Button as MuiButton,
  CircularProgress
} from '@material-ui/core';

// Style
import { useButtonStyle } from './Button.style';

const MuiColors = [
  'default',
  'inherit',
  'primary',
  'secondary'
];

const Button = props => {
  const {
    children,
    color,
    lowercase,
    loading,
    BoxProps,
    fullWidth,
    variant,
    disabled,
    ...rest
  } = props;
  const classes = useButtonStyle({ color });

  return (
    <Box width={fullWidth ? '100%' : 'initial'} {...BoxProps}>
      <MuiButton
        disabled={disabled || loading}
        variant={variant}
        color={MuiColors.includes(color) ? color : 'default'}
        className={clsx(
          lowercase ? classes.lowercase : null,
          classes.variant,
          classes[variant]
        )}
        fullWidth={fullWidth}
        {...rest}
      >
        {loading ? (
          <CircularProgress
            className={clsx(
              (color === 'primary' || color === 'secondary') && classes.progressWhite
            )}
            size={24}
          />
        ) : children}
      </MuiButton>
    </Box>
  );
};

Button.propTypes = {
  BoxProps: PropTypes.object,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
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
  BoxProps: {},
  color: 'default',
  loading: false,
  lowercase: false,
  fullWidth: false
};

export default Button;
