import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Switch as MuiSwitch,
  Box,
  Typography
} from '@material-ui/core';

const Switch = props => {
  const {
    primary,
    secondary,
    checked,
    onChange,
    maxWidth
  } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxWidth={maxWidth}
    >
      <Box display="flex" flexDirection="column">
        <Typography>
          {primary}
        </Typography>
        {secondary && (
          <Typography variant="body2">
            {secondary}
          </Typography>
        )}
      </Box>
      <MuiSwitch
        checked={checked}
        onChange={onChange}
        color="primary"
      />
    </Box>
  );
};

Switch.propTypes = {
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  maxWidth: PropTypes.number
};

Switch.defaultProps = {
  secondary: null,
  maxWidth: null
};

export default Switch;
