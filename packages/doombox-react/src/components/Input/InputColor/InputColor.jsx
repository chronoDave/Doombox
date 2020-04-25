import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '@material-ui/core';

import { InputNativeColor } from '../InputNative';

// Styles
import { useInputColorStyles } from './InputColor.style';

const InputColor = props => {
  const {
    id,
    name,
    value,
    onChange,
    size,
    children,
    ...rest
  } = props;
  const classes = useInputColorStyles({ color: value, size });

  return (
    <InputNativeColor
      id={id}
      name={name}
      onChange={onChange}
    >
      {({ onClick }) => (
        <ButtonBase
          onClick={onClick}
          className={classes.root}
          {...rest}
        >
          {children}
        </ButtonBase>
      )}
    </InputNativeColor>
  );
};

InputColor.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  size: PropTypes.number
};

InputColor.defaultProps = {
  value: null,
  children: null,
  size: 6
};

export default InputColor;
