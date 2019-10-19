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

const SongView = ({ library, fetchSongs }) => {
  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <Box p={3} display="flex" flexDirection="column" height="100%">
      <Box display="flex" flexDirection="column" py={2}>
        <Typography variant="h4">
          Song collection
        </Typography>
        <Typography>
          {`${library ? library.length : 0} songs`}
        </Typography>
      </Box>
      {library ? (
        <VirtualTable
          columns={[
            { key: 'title' },
            { key: 'artist' },
            { key: 'album' },
            { key: 'label', value: 'albumartist' },
            { key: 'duration' }
          ]}
          rows={library}
        />
      ) : <CircularProgress />}
    </Box>
  );
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
