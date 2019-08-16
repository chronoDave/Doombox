import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { styled } from '@material-ui/core/styles';
import {
  Button as MuiButton,
  CircularProgress
} from '@material-ui/core';
import { compose, spacing } from '@material-ui/system';

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
    variant,
    disabled,
    ...rest
  } = props;
  const classes = useButtonStyle({ color });

  return (
    <MuiButton
      disabled={disabled || loading}
      variant={variant}
      color={MuiColors.includes(color) ? color : 'default'}
      classes={{
        root: clsx(
          lowercase ? classes.lowercase : null,
          classes.variant,
          classes[variant]
        )
      }}
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
  );
};

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

export default styled(Button)(compose(spacing));
