import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Button as MuiButton,
  CircularProgress
} from '@material-ui/core';

// Style
import ButtonStyle from './ButtonStyle';

const MuiColors = [
  'default',
  'inherit',
  'primary',
  'secondary'
];

const Button = props => {
  const {
    children,
    classes,
    color,
    lowercase,
    loading,
    BoxProps,
    fullWidth,
    ...rest
  } = props;

  return (
    <Box width={fullWidth ? '100%' : 'initial'} {...BoxProps}>
      <MuiButton
        disabled={rest.disabled || loading}
        color={MuiColors.includes(color) ? color : 'default'}
        className={lowercase ? classes.lowercase : null}
        classes={{ root: classes[`color_${rest.variant || 'text'}_${color}`] }}
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
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
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
  BoxProps: {},
  color: 'default',
  loading: false,
  lowercase: false,
  fullWidth: false
};

export default withStyles(
  ButtonStyle
)(Button);
