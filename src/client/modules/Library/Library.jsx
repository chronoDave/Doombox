import React, { useEffect } from 'react';
import { IPC } from '@doombox-utils/types';
import { formatTime, sortMetadata } from '@doombox-utils';
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
import { propLabel } from '../../validation/propTypes';

const Library = ({ labels }) => {
  useEffect(() => {
    ipcFind(IPC.CHANNEL.IMAGE, {}, { projection: ['_id', 'files'] });
    ipcFind(IPC.CHANNEL.LIBRARY, {}, {
      projection: [
        '_id',
        '_albumId',
        '_labelId',
        'file',
        'duration',
        'images',
        'title',
        'titlelocalized',
        'artist',
        'artistlocalized',
        'album',
        'albumlocalized',
        'albumartist',
        'albumartistlocalized',
        'publisher',
        'publisherlocalized',
        'cdid',
        'date',
        'disc',
        'track',
        'year',
      ]
    });
  }, []);

  const { t, getLocalizedTag } = useTranslation();
  const isSm = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'sm')
  ));
  const isLg = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'lg'),
    create('minHeight', 'md')
  ));

  return (
    <VirtualList
      data={labels}
      itemHeight={({ data, container: { width } }) => {
        const { item, container, header } = mixins.library;

        const breakpoint = (() => {
          if (isLg) return 'lg';
          if (isSm) return 'sm';
          return 'xs';
        })();

        const itemWidth = item[breakpoint].width + (item[breakpoint].padding * 2);
        const itemHeight = item[breakpoint].height + (item[breakpoint].padding * 2);

        const rows = Math.floor((width - (container[breakpoint] * 2)) / itemWidth);
        const columns = Math.ceil(data.albums.length / rows);

        return (columns * itemHeight) + header[breakpoint].height;
      }}
    >
      {({ data, style }) => (
        <LibraryItem
          key={data._id}
          style={style}
          id={data._id}
          primary={getLocalizedTag(data, 'publisher')}
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
  labels: PropTypes.arrayOf(propLabel).isRequired
};

const mapStateToProps = state => ({
  labels: state.entities.labels.list
    .sort(sortMetadata(['publisher'], state.config.display.useLocalizedMetadata))
});

export default connect(
  mapStateToProps
)(Library);
