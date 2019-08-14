import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { Typography as MuiTypography } from '@material-ui/core';

// Utils
import { GREY } from '../../theme/colors';

// Style
import { useTypographyStyle } from './Typography.style';

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
    color,
    transform,
    ...rest
  } = props;
  const classes = useTypographyStyle({ color, transform });

  return (
    <MuiTypography
      color={MuiColors.includes(color) ? color : 'initial'}
      className={clsx(
        !MuiColors.includes(color) && classes.color,
        classes.transform
      )}
      {...rest}
    >
      {children}
    </MuiTypography>
  );
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
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
    Object.keys(GREY).map(key => `grey.${key}`)
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

export default Typography;
