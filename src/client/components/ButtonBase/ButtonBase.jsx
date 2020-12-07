import React, { forwardRef, useState } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useButtonBaseStyles from './ButtonBase.styles';

const ButtonBase = forwardRef((props, ref) => {
  const {
    disableAnimation,
    className,
    children,
    ...rest
  } = props;
  const [holding, setHolding] = useState(false);

  const classes = useButtonBaseStyles();

  return (
    <button
      type="button"
      className={cx(classes.root, {
        [classes.holding]: !disableAnimation && holding
      }, className)}
      {...rest}
      onMouseDown={() => setHolding(true)}
      onMouseUp={() => setHolding(false)}
      ref={ref}
    >
      {children}
    </button>
  );
});

ButtonBase.defaultProps = {
  disableAnimation: false,
  className: null
};

ButtonBase.propTypes = {
  className: PropTypes.string,
  disableAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default ButtonBase;
