import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../Typography';

const VirtualTableDivider = ({ value }) => (
  <Box
    display="flex"
    height="100%"
    flexGrow={1}
    alignItems="center"
    mx={2}
    py={1}
    borderBottom={1}
    color="primary.light"
  >
    <Typography color="inherit">
      {value}
    </Typography>
  </Box>
);

VirtualTableDivider.propTypes = {
  value: PropTypes.string.isRequired
};

export default VirtualTableDivider;
