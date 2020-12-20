import React, { useEffect } from 'react';
import { IPC } from '@doombox-utils/types';
import { formatTime } from '@doombox-utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList } from '../../components';

import { LibraryItem } from '../LibraryItem';

// Hooks
import { useTranslation, useMediaQuery } from '../../hooks';

// Actions
import { ipcFind } from '../../actions';

// Theme
import { mixins } from '../../theme';

// Validation
import { propAlbum } from '../../validation/propTypes';

const Library = ({ labels }) => {
  const { t, getLocalizedTag } = useTranslation();
  const isSm = useMediaQuery(({
    join,
    create,
    queries,
    values
  }) => join(
    create(queries.minWidth, values.sm),
    create(queries.minHeight, values.sm)
  ));
  const isLg = useMediaQuery(({
    join,
    create,
    queries,
    values
  }) => join(
    create(queries.minWidth, values.lg),
    create(queries.minHeight, values.md)
  ));

  useEffect(() => {
    ipcFind(IPC.CHANNEL.IMAGE, {}, { projection: ['file', '_id'] });
    ipcFind(IPC.CHANNEL.LIBRARY, {}, {
      projection: [
        'file',
        'metadata.title',
        'metadata.titlelocalized',
        'metadata.artist',
        'metadata.artistlocalized',
        'metadata.album',
        'metadata.albumlocalized',
        'metadata.albumartist',
        'metadata.albumartistlocalized',
        'metadata.cdid',
        'metadata.date',
        'metadata.disc',
        'metadata.track',
        'metadata.year',
        'format.duration',
        'covers',
        '_id',
        '_albumId',
        '_labelId'
      ]
    });
  }, []);

  return (
    <VirtualList
      data={labels}
      itemHeight={({ data, container: { width } }) => {
        const itemHeight = isSm ?
          mixins.library.item.sm :
          mixins.library.item.xs;
        const itemWidth = isLg ?
          mixins.library.item.lg :
          itemHeight;

        const rows = Math.floor(width / itemWidth);
        const columns = Math.ceil(data.albums.length / rows);

        return columns * itemHeight + mixins.library.header;
      }}
    >
      {({ data, style }) => (
        <LibraryItem
          key={data._id}
          style={style}
          id={data._id}
          albums={data.albums}
          primary={getLocalizedTag(data, 'label')}
          secondary={[
            `${data.albums.length} ${t('common.album', { plural: data.albums.length !== 1 })}`,
            `${data.songs.length} ${t('common.track', { plural: data.songs.length !== 1 })}`,
            formatTime(data.duration || 0)
          ].join(' \u2022 ')}
        />
      )}
    </VirtualList>
  );
};

Library.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    duration: PropTypes.number,
    label: PropTypes.string,
    labellocalized: PropTypes.string,
    songs: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
    albums: PropTypes.arrayOf(propAlbum)
  })).isRequired
};

const mapStateToProps = state => ({
  labels: state.entities.labels.list
    .map(({ albums, ...restLabel }) => ({
      albums: albums
        .map(albumId => {
          const album = state.entities.albums.map[albumId];

          if (!album) return null;

          const { covers = [], ...restAlbum } = album;

          return ({
            cover: covers.map(coverId => {
              const image = state.entities.images.map[coverId];

              return image ? image.file : null;
            })[0],
            ...restAlbum
          });
        })
        .filter(album => album)
        .sort((a, b) => {
          if (a.date && b.date) {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          }
          return a.year - b.year;
        }),
      ...restLabel
    }))
    .sort((a, b) => {
      if ((a.label || '').toLowerCase() < (b.label || '').toLowerCase()) return -1;
      if ((a.label || '').toLowerCase() > (b.label || '').toLowerCase()) return 1;
      return 0;
    })
});

export default connect(
  mapStateToProps,
  null,
  null,
  {
    areStatesEqual: (next, prev) => {
      const isEntityEqual = entity => {
        const nextArray = next.entities[entity].list;
        const prevArray = prev.entities[entity].list;

        if (nextArray.length !== prevArray.length) return false;
        for (let i = 0; i < nextArray.length; i += 1) {
          if (nextArray[i]._id !== prevArray[i]._id) return false;
        }
        return true;
      };

      return (
        isEntityEqual('songs') &&
        isEntityEqual('albums') &&
        isEntityEqual('labels')
      );
    }
  }
)(Library);
