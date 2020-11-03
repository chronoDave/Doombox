import React, { forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useButtonBaseStyles from './ButtonBase.styles';

const ButtonBase = forwardRef((props, ref) => {
  const {
    className,
    children,
    ...rest
  } = props;
  const classes = useButtonBaseStyles();

  return (
    <button
      type="button"
      className={cx(classes.root, className)}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
});

ButtonBase.defaultProps = {
  className: null
};

ButtonBase.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default ButtonBase;
