import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../../components';

const VirtualSongDividerDisc = ({ classes, primary }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    px={2}
    flexGrow={1}
  >
    <div className={classes.dividerDiscLine} />
    <Box px={1}>
      <Typography variant="caption" color="textSecondary">
        {primary}
      </Typography>
    </Box>
    <div className={classes.dividerDiscLine} />
  </Box>
);

VirtualSongDividerDisc.propTypes = {
  classes: PropTypes.shape({
    dividerDiscLine: PropTypes.string.isRequired
  }).isRequired,
  primary: PropTypes.string.isRequired
};

export default VirtualSongDividerDisc;
