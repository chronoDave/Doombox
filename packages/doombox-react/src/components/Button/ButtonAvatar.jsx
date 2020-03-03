import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  ButtonBase,
  Avatar
} from '@material-ui/core';

// Utils
import { pathToUrl } from '../../utils';

// Styles
import { useButtonStyles } from './Button.style';

const ButtonAvatar = forwardRef((props, ref) => {
  const {
    className,
    alt,
    src,
    size,
    icon,
    AvatarProps,
    ...rest
  } = props;
  const classes = useButtonStyles({ size });

  return (
    <ButtonBase
      classes={{ root: classes.avatarRoot }}
      className={clsx(
        classes.avatarHover,
        classes.avatarSize,
        className
      )}
      {...rest}
      ref={ref}
    >
      <Avatar
        alt={alt}
        src={pathToUrl(src)}
        className={clsx(classes.avatarSize, classes.avatarHover)}
        {...AvatarProps}
      >
        {icon || alt.slice(0, 1)}
      </Avatar>
    </ButtonBase>
  );
});

ButtonAvatar.propTypes = {
  AvatarProps: PropTypes.shape(Avatar.Naked.propTypes),
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.number
};

ButtonAvatar.defaultProps = {
  AvatarProps: null,
  src: null,
  className: null,
  icon: null,
  size: 5
};

export default ButtonAvatar;
