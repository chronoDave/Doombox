import React from 'react';

// Modules
import { Player } from '../../../modules';

// Styles
import { useSidebarPanelStyles } from './SidebarPanel.style';

const SidebarPanel = () => {
  const classes = useSidebarPanelStyles();

  return (
    <div className={classes.root}>
      <Player />
    </div>
  );
};

export default SidebarPanel;
