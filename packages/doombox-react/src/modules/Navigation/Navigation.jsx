import React from 'react';

// Icons
import IconVisualizer from '@material-ui/icons/Equalizer';
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';
import IconFavorite from '@material-ui/icons/Grade';

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
  const { setRoute, setDialog } = useRoute(HOOK.ROUTE.METHOD);
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
          onClick={() => setRoute(PATH.DOMAIN.VISUALIZER, PATH.PAGE.ROOT)}
        />
        <IconButtonNavigation
          tooltip="favorites"
          active={
            domain === PATH.DOMAIN.FAVORITES &&
            page === PATH.PAGE.ROOT
          }
          icon={<IconFavorite />}
          onClick={() => setRoute(PATH.DOMAIN.FAVORITES, PATH.PAGE.ROOT)}
        />
        <IconButtonNavigation
          tooltip="labels"
          active={
            domain === PATH.DOMAIN.LIBRARY &&
            page === PATH.PAGE.LABEL
          }
          icon={<IconAlbum />}
          onClick={() => setRoute(PATH.DOMAIN.LIBRARY, PATH.PAGE.LABEL)}
        />
        <IconButtonNavigation
          tooltip="library"
          active={
            domain === PATH.DOMAIN.LIBRARY &&
            page === PATH.PAGE.SONG
          }
          icon={<IconSong />}
          onClick={() => setRoute(PATH.DOMAIN.LIBRARY, PATH.PAGE.SONG)}
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
