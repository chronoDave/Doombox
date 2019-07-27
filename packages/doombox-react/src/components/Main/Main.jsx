import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

import { BgImageProvider } from '../Background';

// Style
import MainStyle from './MainStyle';

const Main = props => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      <BgImageProvider>
        {children}
      </BgImageProvider>
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
