import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList } from '../../components';

import { VirtualAlbumsItem } from '../VirtualAlbumsItem';

// Redux
import { populateSearchAlbums } from '../../redux';

// Hooks
import { useTranslation, useAudio, useMediaQuery } from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propAlbum } from '../../validation/propTypes';

const VirtualAlbums = ({ albums }) => {
  const { set } = useAudio();
  const {
    t,
    formatDate,
    formatTime,
    getLocalizedTag
  } = useTranslation();
  const isSm = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'sm')
  ));
  const isLg = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'lg'),
    create('minHeight', 'md')
  ));

  const getBreakpoint = () => {
    if (isLg) return 'lg';
    if (isSm) return 'sm';
    return 'xs';
  };

  return (
    <VirtualList
      length={albums.length}
      size={() => {
        const breakpoint = getBreakpoint();

        return (
          mixins.albums.item[breakpoint].height +
          mixins.albums.item[breakpoint].padding * 2
        );
      }}
    >
      {({ style, index }) => {
        const album = albums[index];

        if (!album) return null;
        return (
          <VirtualAlbumsItem
            key={album._id}
            style={style}
            cover={album.images[0] ? album.images[0].files.thumbnail : null}
            primary={getLocalizedTag(album, 'album')}
            secondary={getLocalizedTag(album, 'albumartist')}
            details={[{
              label: t('common.release', { transform: 'capitalize' }),
              value: formatDate(album.date || album.year)
            }, isLg && {
              label: t('common.duration', { transform: 'capitalize' }),
              value: formatTime(album.duration, 'text')
            }, {
              label: t('common.track', {
                transform: 'capitalize',
                plural: album.songs.length !== 1
              }),
              value: album.songs.length
            }].filter(detail => detail)}
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
  albums: populateSearchAlbums(state),
});

export default connect(
  mapStateToProps
)(VirtualAlbums);
