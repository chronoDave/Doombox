/** @license Apache-2.0
 * All svg icons used in this application are obtained from https://materialdesignicons.com/
 * */

import React, { forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

import icons from './icons.json';

// Styles
import useIconStyles from './Icon.styles';

const Icon = forwardRef((props, ref) => {
  const {
    type,
    small,
    className,
    ...rest
  } = props;
  const classes = useIconStyles();

  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      color="inherit"
      aria-hidden
      className={cx(classes.root, {
        [classes.small]: small
      }, className)}
      {...rest}
      ref={ref}
    >
      <path d={icons[type]} />
    </svg>
  );
});

Icon.defaultProps = {
  className: null,
  small: false
};

Icon.propTypes = {
  className: PropTypes.string,
  small: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(icons)).isRequired
};

export default Icon;
