import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../Typography';
import { ButtonBase } from '../Button';

// Styles
import { useMenuStyles } from './Menu.style';

const MenuItem = props => {
  const {
    primary,
    secondary,
    onClick
  } = props;
  const classes = useMenuStyles();

  return (
    <ButtonBase
      onClick={onClick}
      classes={{ root: classes.itemRoot }}
    >
      <Typography variant="body2">
        {primary}
      </Typography>
      {secondary && (
        <Box ml={3}>
          <Typography variant="body2" align="right">
            {secondary}
          </Typography>
        </Box>
      )}
    </ButtonBase>
  );
};

MenuItem.propTypes = {
  primary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  secondary: PropTypes.string
};

MenuItem.defaultProps = {
  secondary: null
};

export default MenuItem;
