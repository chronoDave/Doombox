import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  ButtonBase,
  Avatar
} from '@material-ui/core';

// Styles
import { useAvatarStyles } from './Avatar.style';

const ButtonAvatar = forwardRef((props, ref) => {
  const {
    className,
    alt,
    size,
    src,
    icon,
    AvatarProps,
    ...rest
  } = props;
  const classes = useAvatarStyles({ size });

  return (
    <ButtonBase
      classes={{ root: classes.avatarRoot }}
      className={clsx(
        classes.hover,
        classes.size,
        className
      )}
      {...rest}
      ref={ref}
    >
      <Avatar
        alt={alt}
        src={src}
        className={clsx(classes.size, classes.hover)}
        {...AvatarProps}
      >
        {icon || alt.slice(0, 1)}
      </Avatar>
    </ButtonBase>
  );
});

ButtonAvatar.propTypes = {
  AvatarProps: PropTypes.shape({}),
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.number
};

ButtonAvatar.defaultProps = {
  AvatarProps: null,
  alt: '',
  src: null,
  className: null,
  icon: null,
  size: 5
};

export default ButtonAvatar;
