import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  ButtonBase,
  Avatar
} from '@material-ui/core';

// Styles
import { ButtonStyles } from './Button.style';

const ButtonAvatar = props => {
  const {
    classes,
    className,
    title,
    src
  } = props;

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
}

ButtonAvatar.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  classes: PropTypes.shape({
    avatarRoot: PropTypes.string,
    hover: PropTypes.string
  }).isRequired,
  src: PropTypes.string
};

ButtonAvatar.defaultProps = {
  src: null,
  className: null
};

export default withStyles(ButtonStyles)(ButtonAvatar);
