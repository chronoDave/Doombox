import React from 'react';
import PropTypes from 'prop-types';

// Core
import InputNative from './InputNative';

const InputNativeColor = props => {
  const {
    children,
    onChange,
    ...rest
  } = props;

  return (
    <InputNative
      type="color"
      onChange={event => onChange(event.currentTarget.value)}
      {...rest}
    >
      {children}
    </InputNative>
  );
};

InputNativeColor.propTypes = {
  children: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputNativeColor;
