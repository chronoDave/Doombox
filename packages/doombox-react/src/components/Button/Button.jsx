import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Button as MuiButton,
  Box,
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
    disableLowercase,
    loading,
    BoxProps,
    ...rest
  } = props;

  return (
    <Box {...BoxProps}>
      <MuiButton
        disabled={rest.disabled || loading}
        color={MuiColors.includes(color) ? color : null}
        className={!disableLowercase ? classes.lowercase : null}
        classes={{ root: classes[`color_${rest.variant || 'text'}_${color}`] }}
        {...rest}
      >
        {loading ? (
          <CircularProgress size={24} />
        ) : children}
      </MuiButton>
    </Box>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
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
  disableLowercase: PropTypes.bool,
  BoxProps: PropTypes.object
};

Button.defaultProps = {
  color: 'default',
  loading: false,
  disableLowercase: false,
  BoxProps: {}
};

export default withStyles(
  ButtonStyle
)(Button);
