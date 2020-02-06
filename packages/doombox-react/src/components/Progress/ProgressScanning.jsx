import React, { useRef } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  LinearProgress
} from '@material-ui/core';

import { Typography } from '../Typography';

// Styles
import { useProgressStyles } from './Progress.style';

const ProgressScanning = props => {
  const {
    message: {
      file,
      current,
      size
    }
  } = props;
  const classes = useProgressStyles();

  const throttledValue = useRef(throttle(
    (cur, max) => {
      if (!cur || !max) return 0;
      return (Math.round(cur / max * 100));
    }, 100
  )).current;

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
          value={throttledValue(current, size)}
          variant="determinate"
          classes={{ root: classes.root }}
          color="secondary"
        />
        <Typography>
          {`${throttledValue(current, size)}%`}
        </Typography>
      </Box>
      <Typography
        variant="caption"
        align="center"
        clamp={2}
      >
        {file || 'Loading...'}
      </Typography>
    </Box>
  );
};

ProgressScanning.propTypes = {
  message: PropTypes.shape({
    file: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired
  })
};

ProgressScanning.defaultProps = {
  message: {}
};

const mapStateToProps = state => ({
  message: state.message
});

export default connect(
  mapStateToProps
)(ProgressScanning);
