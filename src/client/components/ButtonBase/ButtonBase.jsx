import React, { forwardRef, useState } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useButtonBaseStyles from './ButtonBase.styles';

const ButtonBase = forwardRef((props, ref) => {
  const {
    disableAnimation,
    disabled,
    onMouseUp,
    onMouseDown,
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
        [classes.disabled]: disabled,
        [classes.holding]: !disableAnimation && holding
      }, className)}
      disabled={disabled}
      onMouseUp={event => {
        setHolding(false);
        if (onMouseUp) onMouseUp(event);
      }}
      onMouseDown={event => {
        setHolding(true);
        if (onMouseDown) onMouseDown(event);
      }}
      ref={ref}
      {...rest}
    >
      {children}
    </button>
  );
});

ButtonBase.defaultProps = {
  disableAnimation: false,
  onMouseUp: null,
  onMouseDown: null,
  disabled: false,
  className: null
};

ButtonBase.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  disableAnimation: PropTypes.bool,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  children: PropTypes.node.isRequired
};

ButtonBase.displayName = 'ButtonBase';
export default ButtonBase;
