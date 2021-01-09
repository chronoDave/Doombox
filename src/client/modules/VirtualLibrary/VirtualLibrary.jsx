import React, { Fragment, useState } from 'react';
import { sortMetadata } from '@doombox-utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { VirtualList, Popper, MenuItem } from '../../components';

import { VirtualLibraryItem } from '../VirtualLibraryItem';

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

const VirtualLibrary = ({ library }) => {
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

  return (
    <Fragment>
      <VirtualList
        length={library.length}
        size={(index, width) => {
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
      </Popper>
    </Fragment>
  );
};

VirtualLibrary.propTypes = {
  library: PropTypes.arrayOf(propLabel).isRequired
};

const mapStateToProps = state => ({
  library: state.entities.labels.list
    .sort(sortMetadata(['publisher'], state.config.display.useLocalizedMetadata))
});

export default connect(
  mapStateToProps
)(VirtualLibrary);
