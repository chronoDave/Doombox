import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Drawer,
  Box
} from '@material-ui/core';

import { Logo } from '../Logo';
import { Divider } from '../Divider';
import { Collapse } from '../Collapse';

import SidebarProfile from './SidebarProfile';
import SidebarPlayer from './SidebarPlayer/SidebarPlayer';
import SidebarButtons from './SidebarButtons';
import SidebarVolume from './SidebarVolume';

// Style
import { useSidebarStyle } from './Sidebar.style';

const Sidebar = memo(() => {
  const classes = useSidebarStyle();
  const { t } = useTranslation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.paper }}
    >
      <Box
        display="flex"
        flexDirection="column"
        maxHeight="100vh"
      >
        <Box
          p={2}
          pb={0}
          display="flex"
          alignItems="center"
          flexDirection="column"
          flexGrow={1}
          height="100vh"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            pb={1.5}
          >
            <Logo />
          </Box>
          <Collapse
            title={t('playing')}
            defaultExpanded
          >
            <SidebarPlayer />
          </Collapse>
          <SidebarButtons mt={1} />
          <Divider />
          <SidebarVolume />
          <Divider />
        </Box>
        <Box p={1} bgcolor="grey.500">
          <SidebarProfile />
        </Box>
      </Box>
    </Drawer>
  );
});

export default Sidebar;
