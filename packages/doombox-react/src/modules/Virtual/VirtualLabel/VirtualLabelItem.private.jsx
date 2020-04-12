import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import VirtualLabelHeader from './VirtualLabelHeader.private';
import VirtualLabelAlbum from './VirtualLabelAlbum.private';

// Actions
import { playLibrary } from '../../../actions';

const VirtualLabelItem = ({ index, style, data }) => {
  const {
    classes,
    dimensions,
    handleMenu,
    library
  } = data;

  const renderItem = () => {
    if (!Array.isArray(library[index])) {
      return (
        <VirtualLabelHeader
          classes={classes}
          handleMenu={handleMenu}
          {...library[index]}
        />
      );
    }
    return (
      <Box display="flex" flexWrap="wrap" px={1}>
        {library[index].map(item => {
          const {
            tracks,
            cover,
            ...rest
          } = item;
          const query = { _id: { $in: tracks.flat() } };

          return (
            <VirtualLabelAlbum
              key={item.primary}
              classes={classes}
              cover={cover ? cover.file : null}
              width={dimensions.width}
              onPlay={() => playLibrary({ name: item.primary, query })}
              onMenu={event => handleMenu(
                event.currentTarget,
                { id: 'album', query }
              )}
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
    handleMenu: PropTypes.func.isRequired,
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
