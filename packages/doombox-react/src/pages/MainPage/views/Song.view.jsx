import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Core
import {
  Box,
  CircularProgress
} from '@material-ui/core';

import { Typography } from '../../../components/Typography';
import { VirtualTable } from '../../../components/VirtualTable';

// Api
import { fetchCollection } from '../../../api';

const SongView = ({ collection, library, fetchSongs }) => {
  useEffect(() => {
    fetchSongs('TALB');
  }, []);

  return (
    <Box p={3} display="flex" flexDirection="column" height="100%">
      <Box display="flex" flexDirection="column" py={2}>
        <Typography variant="h4">
          Song collection
        </Typography>
        <Typography>
          {`${collection.length} songs`}
        </Typography>
      </Box>
      {library ? (
        <VirtualTable
          columns={[
            { key: 'title', value: 'TIT2' },
            { key: 'artist', value: 'TPE1' },
            { key: 'album', value: 'TALB' },
            { key: 'label', value: 'TPE2' }
          ]}
          rows={library}
        />
      ) : <CircularProgress />}
    </Box>
  );
};

const mapStateToProps = state => ({
  collection: state.library.collection,
  library: state.library.grouped
});

const mapDispatchToProps = dispatch => ({
  fetchSongs: group => dispatch(fetchCollection({
    group,
    projection: {
      path: 1,
      TIT2: 1,
      TPE1: 1,
      TPE2: 1,
      TALB: 1,
      images: 1
    },
    sort: {
      TALB: 1,
    }
  }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongView);
