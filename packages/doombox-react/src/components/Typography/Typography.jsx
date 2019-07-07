import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { withStyles } from '@material-ui/core/styles';
import { Typography as MuiTypography } from '@material-ui/core';

// Style
import TypographyStyle from './TypographyStyle';

const MuiColors = [
  'initial',
  'inherit',
  'primary',
  'secondary',
  'textPrimary',
  'textSecondary'
];

const Typography = props => {
  const { children, classes, color } = props;

  return (
    <MuiTypography
      color={MuiColors.includes(color) ? color : 'initial'}
      className={clsx(
        !MuiColors.includes(color) && classes[`color_${color}`]
      )}
    >
      {children}
    </MuiTypography>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    'initial',
    'inherit',
    'primary',
    'secondary',
    'textPrimary',
    'textSecondary',
    'error',
    'warning',
    'success',
    'info',
    'white'
  ])
};

Typography.defaultProps = {
  color: 'initial'
};

export default withStyles(
  TypographyStyle
)(Typography);
