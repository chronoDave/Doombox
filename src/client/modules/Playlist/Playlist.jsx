import React, { useRef, useLayoutEffect, useMemo } from 'react';
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

  const ref = useRef();
  const isWidthSm = useMediaQuery(({ create }) => create('minWidth', 'sm'));
  const itemHeight = useMemo(() => (
    isWidthSm ?
      mixins.playlist.item.sm :
      mixins.playlist.item.xs
  ), [isWidthSm]);

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scroll({ top: current * itemHeight });
    }
  }, [current, itemHeight]);

  return (
    <VirtualList
      ref={ref}
      data={songs}
      itemHeight={itemHeight}
    >
      {({ data, style, index }) => (
        <PlaylistItem
          key={data._id}
          active={current === index}
          primary={getLocalizedTag(data, 'title')}
          secondary={getLocalizedTag(data, 'artist')}
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
