import React, { useRef, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { zPad } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Typography, ButtonBase } from '../../components';

// Hooks
import { useAudio, useMediaQuery } from '../../hooks';

// Validation
import { propSong } from '../../validation/propTypes';

// Styles
import usePlaylistStyles from './Playlist.styles';

const Playlist = ({ name, songs, current }) => {
  const classes = usePlaylistStyles();
  const { skip } = useAudio();

  const ref = useRef();
  const isNotSmall = useMediaQuery(({ breakpoints }) => breakpoints.create(
    breakpoints.directions.up,
    breakpoints.values.sm
  ));

  const maxIndex = (() => {
    if (songs.length === 0) return 0;

    const maxSong = songs
      .sort((a, b) => a.metadata.track.of - b.metadata.track.of)
      .pop();

    if (!maxSong) return songs.length;
    return maxSong.metadata.track.of + 1;
  })();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scroll({ top: 0 });
    }
  }, [songs]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography clamp={1} align="center">
          {name}
        </Typography>
      </div>
      <div className={classes.container} ref={ref}>
        {songs.map((song, i) => (
          <ButtonBase
            key={song._id}
            onClick={() => skip(i)}
            className={cx(classes.button, {
              [classes.buttonActive]: current === song._id
            })}
          >
            {isNotSmall && (
              <Typography className={classes.buttonIndex}>
                {`${zPad(song.metadata.track.no || i + 1, maxIndex.toString().length)}.`}
              </Typography>
            )}
            <div className={classes.buttonMetadata}>
              <Typography clamp>
                {song.metadata.title}
              </Typography>
              {isNotSmall && (
                <Typography clamp>
                  {song.metadata.artist}
                </Typography>
              )}
            </div>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};

Playlist.defaultProps = {
  name: 'Playlist',
  songs: [],
  current: ''
};

Playlist.propTypes = {
  name: PropTypes.string,
  songs: PropTypes.arrayOf(propSong),
  current: PropTypes.string
};

const mapStateToProps = state => ({
  name: state.playlist.name,
  songs: state.playlist.collection,
  current: state.player.metadata._id
});

export default connect(
  mapStateToProps
)(Playlist);
