import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Views
import { MainView, InterruptView } from '../../views';

// Types
import { ROUTES } from '../../../../doombox-types';

const Router = ({ route }) => {
  switch (route) {
    case ROUTES.INTERRUPT:
      return <InterruptView />;
    case ROUTES.MAIN:
      return <MainView />;
    default:
      return null;
  }
};

Router.propTypes = {
  route: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  route: state.location.route
});

export default connect(
  mapStateToProps
)(Router);
