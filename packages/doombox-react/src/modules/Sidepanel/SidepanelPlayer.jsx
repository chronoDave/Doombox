import React from 'react';

// Core
import {
  Box,
  Paper
} from '@material-ui/core';

import { Typography } from '../../components/Typography';

import SidepanelCurrent from './SidepanelCurrent';
import SidepanelProgress from './SidepanelProgress';
import SidepanelButtons from './SidepanelButtons';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

// Style
import { useSidepanelStyle } from './Sidepanel.style';

const SidepanelPlayer = () => {
  const padding = 2;

  const { current, image } = useAudio(AUDIO_HOOKS.CURRENT);
  const classes = useSidepanelStyle({ image, padding, opacity: 0.7 });

  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        py={padding}
        px={padding + 1}
      >
        <Box flexGrow={1} display="flex" alignItems="center">
          {!current ? (
            <Typography>
              No song selected
            </Typography>
          ) : (
            <SidepanelCurrent
              artist={current.artist}
              title={current.title}
            />
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
        >
          <SidepanelProgress />
          <SidepanelButtons />
        </Box>
      </Box>
    </Paper>
  );
};

export default SidepanelPlayer;
