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

const ButtonAvatar = props => {
  const {
    className,
    title,
    src,
    onClick,
    onContextMenu
  } = props;
  const classes = useButtonStyles();

  return (
    <ButtonBase
      classes={{ root: classes.avatarRoot }}
      className={clsx(classes.hover, className)}
      onClick={onClick}
      onContextMenu={onContextMenu}
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
  src: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func
};

ButtonAvatar.defaultProps = {
  src: null,
  className: null,
  onContextMenu: () => null
};

export default ButtonAvatar;
