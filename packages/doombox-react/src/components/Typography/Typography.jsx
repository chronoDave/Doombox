import React, { forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { Typography as MuiTypography } from '@material-ui/core';

// Styles
import { useTypographyStyles } from './Typography.style';

const Typography = forwardRef((props, ref) => {
  const {
    children,
    className,
    clamp,
    ...rest
  } = props;
  const classes = useTypographyStyles({ clamp });

  return (
    <MuiTypography
      className={clsx(
        { [classes.clamp]: clamp },
        className
      )}
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
  className: PropTypes.string,
  clamp: PropTypes.number
};

Typography.defaultProps = {
  className: null,
  clamp: null
};

export default Typography;
