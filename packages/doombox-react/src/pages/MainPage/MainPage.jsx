import React, { createElement } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  BackgroundFade,
  BackgroundImage
} from '../../components/Background';
import { Sidebar } from '../../components/Sidebar';
import { useRoute } from '../../components/Router';

// Views
import * as Views from './views';

// Hooks
import { useSubscribeLibrary } from '../../hooks';

// Style
import { useMainPageStyle } from './MainPage.style';

const HomePage = ({ loading }) => {
  useSubscribeLibrary();

  const { view } = useRoute();
  const classes = useMainPageStyle();

  return (
    <div className={classes.root}>
      <BackgroundImage />
      <BackgroundFade />
      <Sidebar />
      {loading ?
        <Views.LoadingView /> :
        createElement(Views[`${view}View`])
      }
    </div>
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
