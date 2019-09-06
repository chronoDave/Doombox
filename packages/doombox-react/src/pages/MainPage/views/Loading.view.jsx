import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Types
import { SCAN } from '@doombox/utils/types';

// Core
import {
  Box,
  LinearProgress
} from '@material-ui/core';

import { useRouter } from '../../../components/Provider';
import { Typography } from '../../../components/Typography';

// Utils
import { MAIN_VIEWS } from '../../../utils/const';

const { ipcRenderer } = window.require('electron');

export const LoadingView = ({ pending }) => {
  const [progress, setProgress] = useState({});
  const { setView } = useRouter();

  useEffect(() => {
    ipcRenderer.on(SCAN, (event, payload) => setProgress(payload));

    return () => ipcRenderer.removeAllListeners([SCAN]);
  }, []);

  const current = progress.current || 0;
  const total = progress.total || 0;

  if (!pending) setView(MAIN_VIEWS.ALBUM);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Box
        p={4}
        maxWidth={600}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        Loading
        <LinearProgress variant="determinate" value={(current / total) * 100} />
        <Typography paragraph>
          {`${current} / ${total}`}
        </Typography>
      </Box>
    </Box>
  );
};

LoadingView.propTypes = {
  pending: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  pending: state.library.pending
});

export default connect(
  mapStateToProps
)(LoadingView);
