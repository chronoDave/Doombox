import React, { forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Icon, icons } from '../Icon';

// Styles
import useButtonIconStyles from './ButtonIcon.styles';

const ButtonIcon = forwardRef((props, ref) => {
  const {
    icon,
    small,
    className,
    ...rest
  } = props;
  const classes = useButtonIconStyles();

  return (
    <ButtonBase
      className={cx(classes.root, {
        [classes.small]: small
      }, className)}
      {...rest}
      ref={ref}
    >
      <Icon type={icon} small={small} />
    </ButtonBase>
  );
});

ButtonIcon.defaultProps = {
  small: false,
  className: '',
};

ButtonIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)).isRequired,
  className: PropTypes.string,
  small: PropTypes.bool
};

export default ButtonIcon;
