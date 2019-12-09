import React from 'react';

// Core
import { SidebarPanel } from './SidebarPanel.private';
import { SidebarTab } from './SidebarTab.private';

// Style
import { useSidebarStyles } from './Sidebar.style';

const Sidebar = () => {
  const classes = useSidebarStyles();

  return (
    <div className={classes.root}>
      <SidebarTab />
      <SidebarPanel />
    </div>
  );
};

export default Sidebar;
