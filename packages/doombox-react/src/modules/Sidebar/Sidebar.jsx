import React from 'react';
import PropTypes from 'prop-types';

// Style
import { useSidebarStyles } from './Sidebar.style';

const Sidebar = ({ tab, panel }) => {
  const classes = useSidebarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.tab}>
        {tab}
      </div>
      <div className={classes.panel}>
        {panel}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  tab: PropTypes.node.isRequired,
  panel: PropTypes.node.isRequired
};

export default Sidebar;
