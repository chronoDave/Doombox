import React from 'react';
import { connect } from 'react-redux';

// Hooks
import { useAudio } from '../../hooks';

// Styles
import useLibrarySongsStyles from './LibrarySongs.styles';

const Library = ({ songs }) => {
  const { create } = useAudio();
  const classes = useLibrarySongsStyles();

  return (
    <div className={classes.root}>
      {songs.map(song => (
        <button
          type="button"
          onClick={() => create(song)}
          key={song._id}
        >
          {`${song.metadata.artist} - ${song.metadata.title}`}
        </button>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  songs: state.entities.songs.list
});

export default connect(
  mapStateToProps
)(Library);
