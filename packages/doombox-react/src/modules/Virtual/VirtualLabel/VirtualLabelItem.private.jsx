import React from 'react';
import { ACTION } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import VirtualLabelHeader from './VirtualLabelHeader.private';
import VirtualLabelAlbum from './VirtualLabelAlbum.private';

// Actions
import { libraryActionPlaylist } from '../../../actions';

const VirtualLabelItem = ({ index, style, data }) => {
  const {
    classes,
    dimensions,
    library
  } = data;

  const renderItem = () => {
    if (!Array.isArray(library[index])) {
      const { tracks, ...rest } = library[index];
      const label = { name: rest.primary, collection: tracks.flat() };

      const handleLabel = action => libraryActionPlaylist(action, label, {
        sort: {
          'metadata.album': 1,
          'metadata.disk.no': 1,
          'metadata.track.no': 1
        }
      });

      return (
        <VirtualLabelHeader
          classes={classes}
          onPlay={() => handleLabel(ACTION.AUDIO.PLAYLIST_SET)}
          onAdd={() => handleLabel(ACTION.AUDIO.PLAYLIST_ADD)}
          {...rest}
        />
      );
    }
    return (
      <Box display="flex" flexWrap="wrap" px={1}>
        {library[index].map(item => {
          const {
            tracks,
            ...rest
          } = item;
          const album = { name: rest.primary, collection: tracks };

          return (
            <VirtualLabelAlbum
              key={rest.primary}
              classes={classes}
              width={dimensions.width}
              onPlay={() => libraryActionPlaylist(ACTION.AUDIO.PLAYLIST_SET, album)}
              {...rest}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <div style={style}>
      {renderItem()}
    </div>
  );
};

VirtualLabelItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    classes: PropTypes.shape({
      divider: PropTypes.string.isRequired,
      buttonAlbum: PropTypes.string.isRequired,
      album: PropTypes.string.isRequired
    }).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    library: PropTypes.oneOfType([
      PropTypes.shape({
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        tooltip: PropTypes.shape({
          add: PropTypes.string.isRequired,
          play: PropTypes.string.isRequired
        }).isRequired
      }),
      PropTypes.arrayOf(PropTypes.shape({
        primary: PropTypes.string.isRequired,
        fields: PropTypes.arrayOf(PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired
        })).isRequired,
        cover: PropTypes.string,
        tooltip: PropTypes.shape({
          album: PropTypes.string.isRequired
        }).isRequired
      }))
    ])
  }).isRequired
};

export default VirtualLabelItem;
