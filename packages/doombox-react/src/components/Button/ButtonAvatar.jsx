import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import {
  ButtonBase,
  Avatar
} from '@material-ui/core';

// Styles
import { useButtonStyles } from './Button.style';

const ButtonAvatar = ({ className, title, src }) => {
  const classes = useButtonStyles();

  return (
    <ButtonBase
      classes={{ root: classes.avatarRoot }}
      className={clsx(classes.hover, className)}
    >
      <Avatar
        alt={title}
        src={src}
        className={classes.hover}
      >
        {title.slice(0, 2)}
      </Avatar>
    </ButtonBase>
  );
};

ButtonAvatar.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  src: PropTypes.string
};

ButtonAvatar.defaultProps = {
  src: null,
  className: null
};

export default ButtonAvatar;
