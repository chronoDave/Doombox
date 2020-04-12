import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Modules
import { Navigation } from '../Navigation';
import { Player } from '../Player';
import { Mixtape } from '../Mixtape';

// Style
import { useSidebarStyles } from './Sidebar.style';

const Sidebar = ({ children, hidePanel }) => {
  const classes = useSidebarStyles({ hidePanel });

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.tab}>
          <Navigation />
        </div>
        {!hidePanel && (
          <div className={classes.panel}>
            <Player />
            <Mixtape />
          </div>
        )}
      </div>
      <div className={classes.children}>
        {children}
      </div>
    </Fragment>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
  hidePanel: PropTypes.bool
};

Sidebar.defaultProps = {
  children: null,
  hidePanel: false
};

export default Sidebar;
