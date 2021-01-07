import React, {
  Fragment,
  useState,
  useEffect,
  useRef
} from 'react';
import { IPC } from '@doombox-utils/types';
import { sortMetadata } from '@doombox-utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList, Popper, MenuItem } from '../../components';

import { LibraryItem } from '../LibraryItem';

// Hooks
import {
  useTranslation,
  useMediaQuery,
  useTimeoutOpen,
  useAudio
} from '../../hooks';

// Actions
import { ipcFind } from '../../actions';

// Theme
import { mixins } from '../../theme';

// Validation
import { propLabel } from '../../validation/propTypes';

const Library = ({ labels, useLocalizedMetadata }) => {
  const [menu, setMenu] = useState({ anchorEl: null, album: {} });

  const { add } = useAudio();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const ref = useRef();

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

  useEffect(() => {
    if (ref.current) ref.current.redraw();
  }, [useLocalizedMetadata]);

  const { t, getLocalizedTag, formatTime } = useTranslation();
  const isSm = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'sm'),
    create('minHeight', 'sm')
  ));
  const isLg = useMediaQuery(({ join, create }) => join(
    create('minWidth', 'lg'),
    create('minHeight', 'md')
  ));

  return (
    <Fragment>
      <VirtualList
        ref={ref}
        size={labels.length}
        itemSize={(index, width) => {
          const breakpoint = (() => {
            if (isLg) return 'lg';
            if (isSm) return 'sm';
            return 'xs';
          })();

          const item = mixins.library.item[breakpoint];
          const body = mixins.library.body[breakpoint];
          const header = mixins.library.header[breakpoint];

          const itemWidth = item.width + (item.padding * 2);
          const itemHeight = item.height + (item.padding * 2);

          const rows = Math.floor((width - (body.padding * 2)) / itemWidth);
          const columns = Math.ceil(labels[index].albums.length / rows);

          return (columns * itemHeight) + header.height;
        }}
      >
        {({ index, style }) => {
          const data = labels[index];

          if (!data) return null;
          return (
            <LibraryItem
              key={data._id}
              style={style}
              id={data._id}
              primary={getLocalizedTag(data, 'publisher')}
              onContextMenu={(event, album) => {
                setMenu({ anchorEl: event.currentTarget, album });
                setOpen(!open);
              }}
              onMouseLeave={handleLeave}
              secondary={[
                `${data.albums.length} ${t('common.album', { plural: data.albums.length !== 1 })}`,
                `${data.songs.length} ${t('common.track', { plural: data.songs.length !== 1 })}`,
                formatTime(data.duration || 0)
              ].join(' \u2022 ')}
            />
          );
        }}
      </VirtualList>
      <Popper
        open={open}
        anchorEl={menu.anchorEl}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="right"
        modifiers={[{
          name: 'offset',
          options: { offset: [0, isSm ? 8 : 0] }
        }]}
      >
        <MenuItem
          primary={t('action.common.add_to', {
            transform: 'capitalize',
            mixins: { item: t('common.playlist') }
          })}
          onClick={() => {
            setOpen(false);
            add(menu.album.songs);
          }}
        />
      </Popper>
    </Fragment>
  );
};

Library.propTypes = {
  labels: PropTypes.arrayOf(propLabel).isRequired,
  useLocalizedMetadata: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  useLocalizedMetadata: state.config.display.useLocalizedMetadata,
  labels: state.entities.labels.list
    .sort(sortMetadata(['publisher'], state.config.display.useLocalizedMetadata))
});

export default connect(
  mapStateToProps
)(Library);
