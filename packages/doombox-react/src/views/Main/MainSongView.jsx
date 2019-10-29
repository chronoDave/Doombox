import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { CircularProgress } from '@material-ui/core';

import { VirtualTable } from '../../components/VirtualTable';

// Template
import MainViewTemplate from './Main.template';

// Validation
import { propSong } from '../../validation/propTypes';

const MainSongView = ({ library }) => (
  <MainViewTemplate
    title={{ key: 'title:collection', context: 'song' }}
    subtitle={`${library ? library.length : 0} songs`}
  >
    {library && library.length !== 0 ? (
      <VirtualTable
        columns={[
          { key: 'title' },
          { key: 'artist' },
          { key: 'album' },
          { key: 'label', value: 'albumartist' }
        ]}
        rows={library}
      />
    ) : <CircularProgress />}
  </MainViewTemplate>
);

const mapStateToProps = state => ({
  library: state.library.collection
});

MainSongView.propTypes = {
  library: PropTypes.arrayOf(propSong).isRequired
};

export default connect(
  mapStateToProps
)(MainSongView);
