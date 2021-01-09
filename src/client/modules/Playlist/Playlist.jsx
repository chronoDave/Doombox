import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList } from '../../components';

import { PlaylistItem } from '../PlaylistItem';

// Hooks
import { useMediaQuery, useTranslation } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propSong } from '../../validation/propTypes';

const Playlist = ({ songs, current }) => {
  const { getLocalizedTag } = useTranslation();
  const isWidthSm = useMediaQuery(({ create }) => create('minWidth', 'sm'));

  return (
    <VirtualList
      length={songs.length}
      size={(isWidthSm ?
        mixins.playlist.item.sm :
        mixins.playlist.item.xs
      )}
      scrollTo={current}
    >
      {({ style, index }) => (
        <PlaylistItem
          key={songs[index]._id}
          active={current === index}
          primary={getLocalizedTag(songs[index], 'title')}
          secondary={getLocalizedTag(songs[index], 'artist')}
          style={style}
          index={index}
        />
      )}
    </VirtualList>
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
