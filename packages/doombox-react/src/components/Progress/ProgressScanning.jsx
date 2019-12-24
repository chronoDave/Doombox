import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Typography,
  LinearProgress
} from '@material-ui/core';

// Hooks
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useProgressStyles } from './Progress.style';

const ProgressScanning = ({ disableAnimation }) => {
  const { current, value, max } = useIpc(HOOK.IPC.MESSAGE);
  const classes = useProgressStyles();

  const getValue = () => {
    if (!value || !max) return 0;
    return (Math.round(value / max * 100));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        width="100%"
        alignItems="center"
        mb={1}
      >
        <LinearProgress
          value={getValue()}
          variant="determinate"
          classes={{ root: classes.root }}
          className={{ [classes.disableAnimation]: disableAnimation }}
          color="secondary"
        />
        <Typography>
          {`${getValue()}%`}
        </Typography>
      </Box>
      <Typography variant="caption" align="center">
        {current || 'Loading...'}
      </Typography>
    </Box>
  );
};

ProgressScanning.propTypes = {
  disableAnimation: PropTypes.bool
};

ProgressScanning.defaultProps = {
  disableAnimation: false
};

export default ProgressScanning;
