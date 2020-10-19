import React from 'react';
import { isMac } from '@doombox-utils';
import { VIEWS } from '@doombox-utils/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { AppBar } from '../AppBar';

// Views
import { MainView, InterruptView } from '../../views';

const App = ({ route }) => (
  <Box
    display="flex"
    flexDirection="column"
    overflow="hidden"
    height="100vh"
  >
    {!isMac && <AppBar />}
    {(() => {
      switch (route) {
        case VIEWS.INTERRUPT:
          return <InterruptView />;
        case VIEWS.MAIN:
          return <MainView />;
        default:
          return null;
      }
    })()}
  </Box>
);

App.propTypes = {
  route: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  route: state.location.view
});

export default connect(
  mapStateToProps
)(App);
