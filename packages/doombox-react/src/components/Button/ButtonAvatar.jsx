import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { ButtonBase } from '@material-ui/core';

import { Avatar } from '../Avatar';

// Styles
import { useButtonStyles } from './Button.style';

const ButtonAvatar = forwardRef((props, ref) => {
  const {
    className,
    alt,
    src,
    size,
    AvatarProps,
    ...rest
  } = props;

  const classes = useButtonStyles({ size });

  return (
    <ButtonBase
      className={clsx(
        classes.avatarRoot,
        classes.avatarHover,
        classes.avatarSize,
        className
      )}
      {...rest}
      ref={ref}
    >
      <Avatar
        alt={alt}
        src={src}
        className={clsx(classes.avatarSize, classes.avatarHover)}
        {...AvatarProps}
      />
    </ButtonBase>
  );
});

ButtonAvatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.number,
  AvatarProps: PropTypes.shape(Avatar.propTypes)
};

ButtonAvatar.defaultProps = {
  AvatarProps: null,
  src: null,
  className: null,
  icon: null,
  size: 5
};

export default ButtonAvatar;
