import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { VirtualList, Popper, MenuItem } from '../../components';

import { VirtualLibraryItem } from '../VirtualLibraryItem';

// Actions
import { ipcInsert } from '../../actions';

// Redux
import { populateLibrary } from '../../redux';

// Hooks
import {
  useTranslation,
  useMediaQuery,
  useTimeoutOpen,
  useAudio
} from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propLabel } from '../../validation/propTypes';

const VirtualLibrary = ({ library, useLocalizedMetadata }) => {
  const [menu, setMenu] = useState({ anchorEl: null, album: {} });

  const { add } = useAudio();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const { t, getLocalizedTag, formatTime } = useTranslation();
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
    <Fragment>
      <VirtualList
        length={library.length}
        size={(index, width) => {
          const breakpoint = getBreakpoint();

          const item = mixins.library.item[breakpoint];
          const body = mixins.library.body[breakpoint];
          const header = mixins.library.header[breakpoint];

          const itemWidth = item.width + (item.padding * 2);
          const itemHeight = item.height + (item.padding * 2);

          const rows = Math.max(1, Math.floor((width - (body.padding * 2)) / itemWidth));
          const columns = Math.ceil(library[index].albums.length / rows);

          return (columns * itemHeight) + header.height;
        }}
      >
        {({ index, style }) => {
          const item = library[index];

          if (!item) return null;
          return (
            <VirtualLibraryItem
              key={item._id}
              style={style}
              id={item._id}
              label={item}
              primary={getLocalizedTag(item, 'publisher')}
              secondary={[
                `${item.albums.length} ${t('common.album', { plural: item.albums.length !== 1 })}`,
                `${item.songs.length} ${t('common.track', { plural: item.songs.length !== 1 })}`,
                formatTime(item.duration || 0)
              ].join(' \u2022 ')}
              onContextMenu={(event, data) => {
                setMenu({ anchorEl: event.currentTarget, data });
                setOpen(!open);
              }}
              onMouseLeave={handleLeave}
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
      >
        <MenuItem
          primary={t('action.common.add_to', {
            transform: 'capitalize',
            mixins: { item: t('common.playlist') }
          })}
          onClick={() => {
            setOpen(false);
            add(menu.data.songs);
          }}
        />
        <MenuItem
          primary={t('action.common.create', {
            transform: 'capitalize',
            mixins: { item: t('common.playlist') }
          })}
          onClick={() => {
            setOpen(false);
            ipcInsert(IPC.CHANNEL.PLAYLIST, {
              name: useLocalizedMetadata ?
                menu.data.albumlocalized :
                menu.data.album,
              collection: menu.data.songs.map(({ _id }) => _id)
            });
          }}
        />
      </Popper>
    </Fragment>
  );
};

VirtualLibrary.propTypes = {
  useLocalizedMetadata: PropTypes.bool.isRequired,
  library: PropTypes.arrayOf(propLabel).isRequired
};

const mapStateToProps = state => ({
  useLocalizedMetadata: state.config.display.useLocalizedMetadata,
  library: populateLibrary(state),
});

export default connect(
  mapStateToProps
)(VirtualLibrary);
