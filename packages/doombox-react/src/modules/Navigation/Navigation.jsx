import React from 'react';

// Icons
import IconVisualizer from '@material-ui/icons/Equalizer';
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  Divider
} from '@material-ui/core';

import { IconButtonNavigation } from '../../components';

import { Mixography } from '../Mixography';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../utils/const';

const Navigation = () => {
  const {
    setDomain,
    setPage,
    setDialog
  } = useRoute(HOOK.ROUTE.METHOD);
  const { page, domain } = useRoute(HOOK.ROUTE.LOCATION);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <IconButtonNavigation
          tooltip="visualizer"
          active={
            domain === PATH.DOMAIN.VISUALIZER &&
            page === PATH.PAGE.ROOT
          }
          icon={<IconVisualizer />}
          onClick={() => setDomain(PATH.DOMAIN.VISUALIZER)}
        />
        <IconButtonNavigation
          tooltip="labels"
          active={
            domain === PATH.DOMAIN.LIBRARY &&
            page === PATH.PAGE.LABEL
          }
          icon={<IconAlbum />}
          onClick={() => {
            setDomain(PATH.DOMAIN.LIBRARY);
            setPage(PATH.PAGE.LABEL);
          }}
        />
        <IconButtonNavigation
          tooltip="library"
          active={
            domain === PATH.DOMAIN.LIBRARY &&
            page === PATH.PAGE.SONG
          }
          icon={<IconSong />}
          onClick={() => {
            setDomain(PATH.DOMAIN.LIBRARY);
            setPage(PATH.PAGE.SONG);
          }}
        />
        <IconButtonNavigation
          tooltip="settings"
          icon={<IconSettings />}
          onClick={() => setDialog(PATH.DIALOG.SETTINGS)}
        />
      </Box>
      <Box p={1} width="100%">
        <Divider />
      </Box>
      <Mixography />
    </Box>
  );
};

export default Navigation;
