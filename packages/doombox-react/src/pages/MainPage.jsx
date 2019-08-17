import React, { createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { useRoute } from '../components/Router';

// Views
import * as Views from './views';

// Template
import { MainTemplate } from './templates';

// Hooks
import { useSubscribeLibrary } from '../hooks';

const HomePage = ({ loading }) => {
  const { view } = useRoute();
  useSubscribeLibrary();

  return (
    <MainTemplate>
      {loading ?
        <Views.LoadingView /> :
        createElement(Views[`${view}View`])
      }
    </MainTemplate>
  );
};

HomePage.propTypes = {
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  loading: state.library.pending
});

export default connect(
  mapStateToProps
)(HomePage);
