import React from 'react';
import { connect } from 'react-redux';

// Core
import { Box } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

const Library = ({ songs }) => {
  const { create } = useAudio();

  return (
    <Box display="flex" flexDirection="column">
      {songs.map(song => (
        <button
          type="button"
          onClick={() => create(song)}
          key={song._id}
        >
          {`${song.metadata.artist} - ${song.metadata.title}`}
        </button>
      ))}
    </Box>
  );
};

const mapStateToProps = state => ({
  songs: state.entities.songs.list
});

export default connect(
  mapStateToProps
)(Library);
