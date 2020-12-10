import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Typography } from '../Typography';

// Styles
import useMenuItemStyles from './MenuItem.styles';

const MenuItem = props => {
  const {
    primary,
    secondary,
    divider,
    onClick,
    onClose
  } = props;
  const classes = useMenuItemStyles();

  return (
    <ButtonBase
      className={cx(classes.root, { [classes.divider]: divider })}
      disableAnimation
      onClick={event => {
        onClick(event);
        onClose(event);
      }}
    >
      <Typography>
        {primary}
      </Typography>
      {secondary && (
        <Typography className={classes.secondary}>
          {secondary}
        </Typography>
      )}
    </ButtonBase>
  );
};

MenuItem.defaultProps = {
  divider: false,
  secondary: null,
  onClose: null
};

MenuItem.propTypes = {
  divider: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  secondary: PropTypes.string
};

export default MenuItem;
