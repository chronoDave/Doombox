import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { cx } from 'emotion';
import { zPad, formatTime } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Typography, ButtonBase, VirtualList } from '../../components';

// Hooks
import { useAudio, useMediaQuery, useTranslation } from '../../hooks';

// Validation
import { propSong } from '../../validation/propTypes';

// Styles
import usePlaylistStyles from './Playlist.styles';

const Playlist = ({ name, songs, current }) => {
  const classes = usePlaylistStyles();
  const { skip } = useAudio();
  const { t } = useTranslation();

  const ref = useRef();
  const isWidthSm = useMediaQuery(breakpoints => breakpoints.create(
    breakpoints.queries.minWidth,
    breakpoints.values.sm
  ));
  const isHeightXs = useMediaQuery(breakpoints => breakpoints.create(
    breakpoints.queries.minHeight,
    breakpoints.values.xs
  ));
  const totalDuration = useMemo(() => songs.reduce((acc, cur) => acc + cur.format.duration, 0), [songs]);

  useLayoutEffect(() => {
    if (ref.current) ref.current.scroll({ top: 0 });
  }, [songs]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography clamp>
          {[
            name,
            !(isWidthSm && isHeightXs) && `(${songs.length})`
          ].filter(string => string).join(' ')}
        </Typography>
        {(isWidthSm && isHeightXs) && (
          <Typography clamp variant="subtitle">
            {[
              `${songs.length} ${t('common.track', { plural: songs.length !== 1 })}`,
              `${formatTime(totalDuration, { useText: true, displaySeconds: false })}`
            ].join(' - ')}
          </Typography>
        )}
      </div>
      <VirtualList
        ref={ref}
        data={songs}
        itemHeight={isWidthSm ? 40 : 24}
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
            {isWidthSm && (
              <Typography className={classes.buttonIndex}>
                {`${zPad(index + 1, `${songs.length}`.length)}.`}
              </Typography>
            )}
            <div className={classes.buttonMetadata}>
              <Typography clamp>
                {data.metadata.title}
              </Typography>
              {isWidthSm && (
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
