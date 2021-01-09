import React from 'react';
import PropTypes from 'prop-types';

// Core
import { ButtonBase, Typography } from '../../components';

// Validation
import { propVirtualStyle } from '../../validation/propTypes';

// Styles
import useVirtualLabelsItemStyles from './VirtualLabelsItem.styles';

const VirtualLabelsItem = ({ style, primary, onClick }) => {
  const classes = useVirtualLabelsItemStyles();

  return (
    <ButtonBase
      style={style}
      className={classes.root}
      primary={primary}
      onClick={onClick}
    >
      <Typography clamp>
        {primary}
      </Typography>
    </ButtonBase>
  );
};

VirtualLabelsItem.propTypes = {
  style: propVirtualStyle.isRequired,
  primary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default VirtualLabelsItem;
