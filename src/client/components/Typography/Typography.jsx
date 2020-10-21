import React, { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { Typography as MuiTypography } from '@material-ui/core';

// Styles
import { useTypographyStyles } from './Typography.styles';

const Typography = forwardRef((props, ref) => {
  const {
    children,
    className,
    bold,
    clamp,
    ...rest
  } = props;
  const classes = useTypographyStyles({ clamp });

  return (
    <MuiTypography
      className={clsx({
        [classes.clamp]: clamp,
        [classes.bold]: bold
      }, className)}
      {...rest}
      ref={ref}
    >
      {children}
    </MuiTypography>
  );
});

Typography.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  bold: PropTypes.bool,
  className: PropTypes.string,
  clamp: PropTypes.number
};

Typography.defaultProps = {
  className: null,
  bold: false,
  clamp: null
};

export default Typography;
