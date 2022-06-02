import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';

import './InputText.scss';

const InputText = forwardRef(({ className, ...rest }, ref) => (
  <input
    {...rest}
    ref={ref}
    type="text"
    autoCapitalize="off"
    spellCheck={false}
    className={cx('InputText', className)}
  />
));

InputText.propTypes = {
  className: PropTypes.string
};

InputText.defaultProps = {
  className: null
};

export default InputText;
