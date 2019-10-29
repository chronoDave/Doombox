import React, {
  Fragment,
  useState
} from 'react';

// Core
import {
  Box,
  Drawer
} from '@material-ui/core';

import { Logo } from '../../components/Logo';

import Settings from '../Settings/Settings';

import SidebarButtons from './SidebarButtons';
import SidebarPlaylist from './SidebarPlaylist';

// Style
import { useSidebarStyle } from './Sidebar.style';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const classes = useSidebarStyle();

  return (
    <Fragment>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.paper }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          py={1}
        >
          <Box py={0.5} color="grey.200" borderBottom={1}>
            <Logo size={6} />
          </Box>
          <SidebarButtons
            onClickSettings={() => setOpen(true)}
            py={0.5}
            color="grey.200"
            borderBottom={1}
          />
          <SidebarPlaylist py={0.5} />
        </Box>
      </Drawer>
      <Settings open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

export default Sidebar;
