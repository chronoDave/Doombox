import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';

// Modules
import { Sidebar } from '../../entities';

// Style
import { MainStyles } from './Main.style';

const MainTemplate = ({ classes, children }) => (
  <Fragment>
    <Sidebar />
    <div className={classes.root}>
      {children}
    </div>
  </Fragment>
);

MainTemplate.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.element.isRequired
};

export default withStyles(MainStyles)(MainTemplate);
