import React, { forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Icon } from '..';
import { icons } from '../Icon/Icon';

// Styles
import useButtonIconStyles from './ButtonIcon.styles';

const ButtonIcon = forwardRef((props, ref) => {
  const {
    icon,
    small,
    disabled,
    className,
    ...rest
  } = props;
  const classes = useButtonIconStyles();

  return (
    <ButtonBase
      className={cx(classes.root, {
        [classes.small]: small,
        [classes.hover]: !disabled,
        [classes.disabled]: disabled
      }, className)}
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
