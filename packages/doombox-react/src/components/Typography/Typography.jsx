import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { Typography as MuiTypography } from '@material-ui/core';

// Validation
import { propColors } from '../../validation/propTypes';

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

const Typography = forwardRef((props, ref) => {
  const {
    children,
    color,
    transform,
    breakWord,
    ...rest
  } = props;
  const classes = useTypographyStyle({ color, transform });

  return (
    <MuiTypography
      ref={ref}
      color={MuiColors.includes(color) ? color : 'initial'}
      className={clsx(
        !MuiColors.includes(color) && classes.color,
        classes.transform,
        breakWord && classes.breakWord
      )}
      {...rest}
    >
      {children}
    </MuiTypography>
  );
});

Typography.propTypes = {
  breakWord: PropTypes.bool,
  children: PropTypes.node.isRequired,
  color: propColors,
  transform: PropTypes.oneOf([
    'lowercase',
    'uppercase',
    'default'
  ])
};

Typography.defaultProps = {
  breakWord: false,
  color: 'initial',
  transform: 'default'
};

export default Typography;
