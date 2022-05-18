import React, { forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { Typography } from '..';

// Styles
import useSearchStyles from './InputText.styles';

const InputText = forwardRef(({ className, ...rest }, ref) => {
  const classes = useSearchStyles();

  return (
    <Typography
      element="input"
      ref={ref}
      type="text"
      autoCapitalize="off"
      spellCheck="false"
      className={cx(classes.input, classes.root, className)}
      {...rest}
    />
  );
});

InputText.propTypes = {
  className: PropTypes.string
};

InputText.defaultProps = {
  className: null
};

export default InputText;
