import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

import { BackgroundProvider } from '../Background';

// Style
import MainStyle from './MainStyle';

const Main = props => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <BackgroundProvider>
        {children}
      </BackgroundProvider>
    </div>
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withStyles(
  MainStyle
)(Main);
