import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Typography } from '../../components';

const PlayerMetadata = props => {
  const {
    title,
    artist,
    album,
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      alignItems="center"
    >
      <Typography>
        {title}
      </Typography>
      <Typography>
        {artist}
      </Typography>
      <Typography>
        {album}
      </Typography>
    </Box>
  );
};

PlayerMetadata.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string
};

PlayerMetadata.defaultProps = {
  title: 'No song selected',
  artist: '',
  album: ''
};

const mapStateToProps = state => ({
  title: state.audio.metadata.title,
  artist: state.audio.metadata.artist,
  album: state.audio.metadata.album
});

export default connect(
  mapStateToProps
)(PlayerMetadata);
