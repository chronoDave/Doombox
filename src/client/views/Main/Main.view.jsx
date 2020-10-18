import React, { useEffect } from 'react';
import { IPC } from '@doombox-utils/types';

// Core
import { Box } from '@material-ui/core';

// Modules
import { Player, Playlist, Library } from '../../modules';

// Actions
import { ipcFind } from '../../actions';

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
