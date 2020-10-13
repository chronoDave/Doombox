import React, { useEffect } from 'react';

// Core
import { Box } from '@material-ui/core';

// Modules
import { Player, Playlist, Library } from '../../modules';

// Actions
import { ipcFind } from '../../actions';

// Types
import { IPC } from '../../../../doombox-types';

const MainView = () => {
  useEffect(() => {
    ipcFind(IPC.CHANNEL.IMAGE);
    ipcFind(IPC.CHANNEL.LABEL);
    ipcFind(IPC.CHANNEL.ALBUM);
    ipcFind(IPC.CHANNEL.LIBRARY);
  }, []);

  return (
    <Box display="flex" minHeight={0}>
      <Box display="flex" flexDirection="column">
        <Player />
        <Playlist />
      </Box>
      <Library />
    </Box>
  );
};

export default MainView;
