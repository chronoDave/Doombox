import React, { forwardRef } from 'react';
import { cx } from '@doombox-utils';
import PropTypes from 'prop-types';

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
