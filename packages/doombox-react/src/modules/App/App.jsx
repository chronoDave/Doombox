import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import {
  Box,
  ButtonBase
} from '@material-ui/core';

import { Icon } from '../../components';

import AppBar from './AppBar.private';

// Actions
import {
  windowMaximize,
  windowClose,
  windowMinimize
} from '../../actions';

// Styles
import { useAppStyles } from './App.styles';

const App = ({ children }) => {
  const classes = useAppStyles();

  return (
    <Fragment>
      <AppBar />
      <div className={classes.root}>
        <div className={classes.body}>
          {children}
        </div>
        <Box display="flex" flexShrink={0}>
          <ButtonBase
            onClick={windowMinimize}
            classes={{ root: classes.button }}
          >
            <Icon type="minimize" fontSize="small" />
          </ButtonBase>
          <ButtonBase
            onClick={windowMaximize}
            classes={{ root: classes.button }}
          >
            <IconMaximize fontSize="small" />
          </ButtonBase>
          <ButtonBase
            onClick={windowClose}
            classes={{ root: classes.button }}
            className={classes.buttonClose}
          >
            <IconClose fontSize="small" />
          </ButtonBase>
        </Box>
      </div>
    </Fragment>
  );
};

App.propTypes = {
  children: PropTypes.node.isRequired
};

export default App;
