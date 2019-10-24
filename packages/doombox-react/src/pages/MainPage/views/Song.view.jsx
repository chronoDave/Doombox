import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { CircularProgress } from '@material-ui/core';

import { VirtualTable } from '../../../components/VirtualTable';

// Validation
import { propSong } from '../../../validation/propTypes';

// Template
import { MainViewTemplate } from '../../../templates';

// Api
import { fetchCollection } from '../../../api';

const SongView = ({ library, fetchSongs }) => {
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <MainViewTemplate
      title={{ key: 'title:collection', context: 'song' }}
      subtitle={`${library ? library.length : 0} songs`}
    >
      {library ? (
        <VirtualTable
          columns={[
            { key: 'title' },
            { key: 'artist' },
            { key: 'album' },
            { key: 'label', value: 'albumartist' }
          ]}
          rows={library}
          group="album"
        />
      ) : <CircularProgress />}
    </MainViewTemplate>
  );
};

SongView.propTypes = {
  library: PropTypes.arrayOf(propSong),
  fetchSongs: PropTypes.func.isRequired
};

SongView.defaultProps = {
  library: null
};

const mapStateToProps = state => ({
  library: state.library.collection
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: () => dispatch(fetchCollection())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongView);
