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
  const {
    children,
    classes,
    color,
    transform,
    ...rest
  } = props;

  return (
    <MuiTypography
      color={MuiColors.includes(color) ? color : 'initial'}
      className={clsx(
        !MuiColors.includes(color) && classes[`color_${color}`],
        classes[`transform_${transform}`]
      )}
      {...rest}
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
    'textTertiary',
    'error',
    'warning',
    'success',
    'info',
    'white'
  ]),
  transform: PropTypes.oneOf([
    'lowercase',
    'uppercase',
    'default'
  ])
};

Typography.defaultProps = {
  color: 'initial',
  transform: 'default'
};

export default withStyles(
  TypographyStyle
)(Typography);
