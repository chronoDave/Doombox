import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

// Style
import MainStyle from './MainStyle';

const Main = props => {
  const { classes, children } = props;

  return (
    <div className={classes.root}>
      {children}
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
