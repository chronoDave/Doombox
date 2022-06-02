import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { shuffle } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Popper,
  MenuItem,
  VirtualList } from '../../components';

// Actions
import { createPlaylist } from '../../actions';

// Redux
import { populateSearchAlbums } from '../../redux';

// Hooks
import {
  useTranslation,
  useAudio,
  useMediaQuery,
  useTimeoutOpen
} from '../../hooks';

// Theme
import { mixins } from '../../theme';

// Validation
import { propAlbum } from '../../validation/propTypes';

import VirtualAlbumsItem from './components/VirtualAlbumsItem/VirtualAlbumsItem';

const VirtualAlbums = ({ albums }) => {
  const [menu, setMenu] = useState({ anchorEl: null, album: null });

  const { add, set } = useAudio();
  const {
    t,
    formatDate,
    formatTime,
    getLocalizedTag
  } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
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
              onContextMenu={event => {
                setMenu({ anchorEl: event.currentTarget, album });
                setOpen(true);
              }}
              onMouseEnter={() => open && handleEnter()}
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
        placement="left"
      >
        <MenuItem
          primary={t('action.common.add_to', {
            mixins: { item: t('common.playlist') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            add(menu.album.songs);
          }}
        />
        <MenuItem
          primary={t('action.common.shuffle', {
            mixins: { item: t('common.album') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            set({
              name: getLocalizedTag(menu.album, 'album'),
              collection: shuffle(menu.album.songs)
            });
          }}
          divider
        />
        <MenuItem
          primary={t('action.common.create', {
            mixins: { item: t('common.playlist') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            createPlaylist(
              getLocalizedTag(menu.label, 'publisher'),
              menu.label.songs
            );
          }}
        />
      </Popper>
    </Fragment>
  );
};

VirtualAlbums.propTypes = {
  albums: PropTypes.arrayOf(propAlbum).isRequired
};

const mapStateToProps = state => ({
  albums: populateSearchAlbums(state)
});

export default connect(
  mapStateToProps
)(VirtualAlbums);
