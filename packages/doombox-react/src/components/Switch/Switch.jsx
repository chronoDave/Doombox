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
    id
  } = props;

  return (
    <Box display="flex" p={1} justifyContent="space-between">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography gutterBottom={!!secondary}>
          {primary}
        </Typography>
        {secondary && (
          <Typography variant="body2">
            {secondary}
          </Typography>
        )}
      </Box>
      <MuiSwitch
        inputProps={{ id: id || primary }}
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
  id: PropTypes.string
};

Switch.defaultProps = {
  secondary: null,
  id: null
};

export default Switch;
