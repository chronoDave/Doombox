import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList } from '../../components';

import { VirtualAlbumsItem } from '../VirtualAlbumsItem';

// Redux
import { populateAlbums } from '../../redux';

// Hooks
import { useTranslation, useAudio } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propAlbum } from '../../validation/propTypes';

const VirtualAlbums = ({ albums }) => {
  const { set } = useAudio();
  const { getLocalizedTag } = useTranslation();

  return (
    <VirtualList
      length={albums.length}
      size={mixins.albums.item}
    >
      {({ style, index }) => {
        const album = albums[index];

        if (!album) return null;
        return (
          <VirtualAlbumsItem
            key={album._id}
            style={style}
            primary={getLocalizedTag(album, 'album')}
            secondary={getLocalizedTag(album, 'albumartist')}
            onClick={() => set({
              name: getLocalizedTag(album, 'album'),
              collection: album.songs
            })}
          />
        );
      }}
    </VirtualList>
  );
};

VirtualAlbums.propTypes = {
  albums: PropTypes.arrayOf(propAlbum).isRequired
};

const mapStateToProps = state => ({
  albums: populateAlbums(state, state.search.albums),
});

export default connect(
  mapStateToProps
)(VirtualAlbums);
