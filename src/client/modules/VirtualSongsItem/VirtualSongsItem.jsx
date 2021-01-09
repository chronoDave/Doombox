import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography } from '../../components';

// Validation
import { propVirtualStyle } from '../../validation/propTypes';

// Styles
import useVirtualSongsItemStyles from './VirtualSongsItem.styles';

const VirtualSongsItem = props => {
  const {
    style,
    primary,
    secondary,
    onClick
  } = props;
  const classes = useVirtualSongsItemStyles();

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

VirtualSongsItem.propTypes = {
  style: propVirtualStyle.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default VirtualSongsItem;
