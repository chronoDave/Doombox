import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography } from '../../components';

// Validation
import { propVirtualStyle } from '../../validation/propTypes';

// Styles
import useVirtualAlbumsItemStyles from './VirtualAlbumsItem.style';

const VirtualAlbumsItem = props => {
  const {
    style,
    primary,
    secondary,
    onClick
  } = props;
  const classes = useVirtualAlbumsItemStyles();

  return (
    <ButtonBase
      style={style}
      className={classes.root}
      primary={primary}
      secondary={secondary}
      onClick={onClick}
    >
      <Typography clamp>
        {primary}
      </Typography>
      <Typography clamp color="textSecondary">
        {secondary}
      </Typography>
    </ButtonBase>
  );
};

VirtualAlbumsItem.propTypes = {
  style: propVirtualStyle.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default VirtualAlbumsItem;
