import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Styles
import { useInputNativeStyles } from './InputNative.style';

const InputNative = props => {
  const {
    id,
    name,
    type,
    fullWidth,
    children,
    ...rest
  } = props;

  const classes = useInputNativeStyles();

  const onClick = () => {
    const input = document.getElementById(id);
    input.value = null;

    if (input) input.click();
  };

  return (
    <Fragment>
      <input
        id={id}
        type={type}
        className={classes.hidden}
        tabIndex="-1"
        {...rest}
      />
      <label
        className={clsx(
          classes.label,
          { [classes.fullWidth]: fullWidth }
        )}
        htmlFor={`${type}-${name}`}
        tabIndex="-1"
      >
        {children({ onClick })}
      </label>
    </Fragment>
  );
};

InputNative.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  children: PropTypes.func.isRequired
};

InputNative.defaultProps = {
  fullWidth: false
};

export default InputNative;
