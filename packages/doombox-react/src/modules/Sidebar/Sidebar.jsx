import React from 'react';
import { useTranslation } from 'react-i18next';

// Core
import {
  Drawer,
  Box
} from '@material-ui/core';

import { Collapse } from '../../components/Collapse';
import { Divider } from '../../components/Divider';
import { Logo } from '../../components/Logo';
import { Typography } from '../../components/Typography';

import SidebarPlayer from './SidebarPlayer';
import SidebarButtons from './SidebarButtons';
import SidebarVolume from './SidebarVolume';
import SidebarViews from './SidebarViews';
import SidebarProfile from './SidebarProfile';

// Style
import { useSidebarStyle } from './Sidebar.style';

const Sidebar = () => {
  const classes = useSidebarStyle();
  const { t } = useTranslation();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      classes={{ paper: classes.paper }}
    >
      {console.log('Sidebar rerender!')}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Box display="flex" flexDirection="column" p={2}>
          <Box display="flex" flexDirection="column" alignItems="center" pb={1}>
            <Logo />
            <Typography>Doombox</Typography>
          </Box>
          <Collapse title={t('playing')} defaultExpanded>
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <SidebarPlayer />
              <Divider mt={0.5} mb={0} />
            </Box>
          </Collapse>
          <SidebarButtons />
          <Divider my={0} />
          <SidebarVolume />
          <Collapse title={t('views')} defaultExpanded>
            <Box display="flex" flexDirection="column" flexGrow={1}>
              <SidebarViews />
              <Divider mt={0.5} mb={0} />
            </Box>
          </Collapse>
        </Box>
        <SidebarProfile />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
