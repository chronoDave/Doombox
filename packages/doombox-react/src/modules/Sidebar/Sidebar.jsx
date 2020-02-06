import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Modules
import { Navigation } from '../Navigation';
import { Player } from '../Player';
import { Playlist } from '../Playlist';

// Style
import { useSidebarStyles } from './Sidebar.style';

const Sidebar = ({ children }) => {
  const classes = useSidebarStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.tab}>
          <Navigation />
        </div>
        <div className={classes.panel}>
          <Player />
          <Playlist />
        </div>
      </div>
      <div className={classes.children}>
        {children}
      </div>
    </Fragment>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired
};

export default Sidebar;
