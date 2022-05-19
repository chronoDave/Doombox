import React, { forwardRef } from 'react';
import { cx } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Icon } from '..';
import { icons } from '../Icon/Icon';

import './ButtonIcon.scss';

const ButtonIcon = forwardRef((props, ref) => {
  const {
    icon,
    small,
    disabled,
    className,
    ...rest
  } = props;

  return (
    <ButtonBase
      className={cx(
        'ButtonIcon',
        small && 'small',
        className
      )}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      <Icon type={icon} small={small} />
    </ButtonBase>
  );
});

ButtonIcon.defaultProps = {
  small: false,
  disabled: false,
  className: null,
};

ButtonIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  small: PropTypes.bool
};

ButtonIcon.displayName = 'ButtonIcon';
export default ButtonIcon;
