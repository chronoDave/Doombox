import React, { useRef, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { zPad } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Typography, ButtonBase, VirtualList } from '../../components';

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
  const isNotSmall = useMediaQuery(breakpoints => breakpoints.create(
    breakpoints.queries.minWidth,
    breakpoints.values.sm
  ));

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scroll({ top: 0 });
    }
  }, [songs]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography clamp align="center">
          {name}
        </Typography>
      </div>
      <VirtualList
        data={songs}
        item={{ height: isNotSmall ? 40 : 20 }}
        ref={ref}
      >
        {({ data, style, index }) => (
          <ButtonBase
            style={style}
            key={data._id}
            onClick={() => skip(index)}
            className={cx(classes.button, {
              [classes.buttonActive]: current === data._id
            })}
          >
            {isNotSmall && (
              <Typography className={classes.buttonIndex}>
                {`${zPad(index + 1, `${songs.length}`.length)}.`}
              </Typography>
            )}
            <div className={classes.buttonMetadata}>
              <Typography clamp>
                {data.metadata.title}
              </Typography>
              {isNotSmall && (
                <Typography clamp>
                  {data.metadata.artist}
                </Typography>
              )}
            </div>
          </ButtonBase>
        )}
      </VirtualList>
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
