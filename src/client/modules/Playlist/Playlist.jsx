import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { VirtualList, VirtualListItem } from '../../components';
import { useMediaQuery, useTranslation, useAudio } from '../../hooks';
import { mixins } from '../../theme';
import { propSong } from '../../validation/propTypes';

import PlaylistTitle from './components/PlaylistTitle/PlaylistTitle';

const Playlist = ({ songs, current }) => {
  const { getLocalizedTag } = useTranslation();
  const { skip } = useAudio();
  const isWidthSm = useMediaQuery(({ create }) => create('minWidth', 'sm'));

  return (
    <Fragment>
      <PlaylistTitle />
      <VirtualList
        length={songs.length}
        size={(isWidthSm ?
          mixins.virtual.item * 2 :
          mixins.virtual.item
        )}
        scrollTo={current}
      >
        {({ style, index }) => {
          const song = songs[index];

          if (!song) return null;
          return (
            <VirtualListItem
              key={song._id}
              active={current === index}
              primary={getLocalizedTag(song, 'title')}
              secondary={isWidthSm ? getLocalizedTag(song, 'artist') : null}
              onClick={() => skip(index)}
              style={style}
              index={isWidthSm ? index : null}
            />
          );
        }}
      </VirtualList>
    </Fragment>
  );
};

Playlist.defaultProps = {
  songs: []
};

Playlist.propTypes = {
  songs: PropTypes.arrayOf(propSong),
  current: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  songs: state.playlist.collection,
  current: state.playlist.index
});

export default connect(
  mapStateToProps
)(Playlist);
