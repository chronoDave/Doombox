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
  } = props;
  const classes = useMenuItemStyles();

  return (
    <ButtonBase
      className={cx(classes.root, { [classes.divider]: divider })}
      disableAnimation
      onClick={onClick}
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
  secondary: null
};

MenuItem.propTypes = {
  divider: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  secondary: PropTypes.string
};

export default MenuItem;
