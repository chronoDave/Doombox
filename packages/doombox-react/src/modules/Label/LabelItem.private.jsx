import React, { memo } from 'react';
import { areEqual } from 'react-window';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

// Utils
import { formatTime } from '../../utils';
import { propLabel } from '../../utils/propTypes';

import LabelItemHeader from './LabelItemHeader.private';
import LabelItemAlbum from './LabelItemAlbum.private';

const LabelItem = memo(({ index, style, data }) => {
  const {
    labels,
    dimensions: {
      width,
      height,
      header,
      padding
    },
    handlePlaylistPlay,
    handlePlaylistAdd,
    hooks
  } = data;

  const {
    albums,
    albumartist
  } = labels[index];

  const trackCount = Object
    .values(albums)
    .reduce((acc, cur) => acc + cur.songs.length, 0);

  const reduceSongDuration = songs => songs
    .reduce((acc, cur) => (acc + cur.format.duration || 0), 0);
  const totalDuration = Object
    .values(albums)
    .reduce((acc, cur) => acc + reduceSongDuration(cur.songs), 0);

  const headerSecondary = [
    hooks.t('albumCount', { count: albums.length }),
    hooks.t('trackCount', { count: trackCount }),
    formatTime(totalDuration, 'text')
  ].join(' \u2022 ');

  const collection = albums.map(album => album.songs).flat();

  const handleLabelPlay = () => handlePlaylistPlay({
    name: albumartist,
    collection
  });

  const handleLabelAdd = () => handlePlaylistAdd(collection);

  return (
    <div style={style}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        px={padding}
      >
        <LabelItemHeader
          primary={albumartist}
          secondary={headerSecondary}
          maxHeight={header}
          onPlaylistPlay={handleLabelPlay}
          onPlaylistAdd={handleLabelAdd}
          {...hooks}
        />
        <Box display="flex" flexWrap="wrap">
          {albums.map(albumProps => (
            <LabelItemAlbum
              key={albumProps.album}
              maxHeight={height}
              maxWidth={width}
              onPlaylistPlay={handlePlaylistPlay}
              {...albumProps}
              {...hooks}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
}, areEqual);

LabelItem.displayName = 'VirtualLabelItem';
LabelItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(propLabel).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      header: PropTypes.number.isRequired,
      padding: PropTypes.number.isRequired
    }).isRequired,
    handlePlaylistPlay: PropTypes.func.isRequired,
    handlePlaylistAdd: PropTypes.func.isRequired,
    hooks: PropTypes.shape({
      classes: PropTypes.shape({
        divider: PropTypes.string.isRequired,
        albumButton: PropTypes.string.isRequired,
        albumImage: PropTypes.string.isRequired
      }),
      t: PropTypes.func.isRequired
    }).isRequired
  }).isRequired
};

export default LabelItem;
