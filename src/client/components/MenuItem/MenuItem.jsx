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
    ...rest
  } = props;
  const classes = useMenuItemStyles();

  return (
    <ButtonBase
      className={cx(classes.root, { [classes.divider]: divider })}
      disableAnimation
      {...rest}
    >
      <Typography color="inherit">
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
  secondary: PropTypes.string
};

export default MenuItem;
