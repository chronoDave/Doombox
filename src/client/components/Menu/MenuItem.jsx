import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';
import { Typography } from '../Typography';

// Styles
import useMenuStyles from './Menu.styles';

const MenuItem = props => {
  const {
    primary,
    secondary,
    divider,
    onClick,
    onClose
  } = props;
  const classes = useMenuStyles();

  return (
    <ButtonBase
      onClick={event => {
        onClick(event);
        if (typeof onClose === 'function') onClose(event);
      }}
      className={cx(classes.itemRoot, { [classes.itemDivider]: divider })}
    >
      <Typography>
        {primary}
      </Typography>
      {secondary && (
        <Typography className={classes.itemSecondary}>
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
