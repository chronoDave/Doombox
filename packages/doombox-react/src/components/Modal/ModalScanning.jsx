import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  LinearProgress
} from '@material-ui/core';

import { Typography } from '../Typography';

import ModalBase from './ModalBase';

const ModalScanning = props => {
  const {
    progress,
    title,
    subtitle,
    ...rest
  } = props;

  return (
    <ModalBase
      disableButton
      maxWidth={720}
      {...rest}
    >
      <Box
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h5" align="center" paragraph>
          {title}
        </Typography>
        {subtitle && (
          <Typography align="center" paragraph>
            {subtitle}
          </Typography>
        )}
        <Box display="flex" alignItems="center">
          <LinearProgress
            variant="determinate"
            value={progress || 0}
          />
          <Box pl={1}>
            <Typography>
              {`${Math.round(progress || 0)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>
    </ModalBase>
  );
};

ModalScanning.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  progress: PropTypes.number.isRequired
};

ModalScanning.defaultProps = {
  subtitle: null
};

export default ModalScanning;
