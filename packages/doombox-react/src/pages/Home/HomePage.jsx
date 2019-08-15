import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Core
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import { Main } from '../../components/Main';
import { Button } from '../../components/Button';

// Api
import { fetchLibrary } from '../../api/libraryApi';

// Views
import * as Views from './views';

const HomePage = ({ pending, library, getLibrary }) => {
  useEffect(() => {
    if (!pending && library) getLibrary(library);
  }, [library]);
  const [view, setView] = useState('loading');

  return (
    <Main>
      {pending ? (
        <Views.LoadingView />
      ) : (
        <div>Loaded</div>
      )}
    </Main>
  );
};

const mapStateToProps = state => ({
  pending: state.library.pending,
  library: state.profile.user.library
});

const mapDispatchToProps = dispatch => ({
  getLibrary: () => dispatch(fetchLibrary())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
