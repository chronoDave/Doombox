import React from 'react';

// Core
import {
  Box,
  Divider as MuiDivder
} from '@material-ui/core';

const Divider = ({ ...rest }) => (
  <Box
    width="100%"
    my={1}
    {...rest}
  >
    <MuiDivder />
  </Box>
);

export default Divider;
