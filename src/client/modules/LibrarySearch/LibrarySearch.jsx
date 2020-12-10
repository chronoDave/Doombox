import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { shuffle } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  ButtonIcon,
  InputSearch,
  Menu,
  MenuItem
} from '../../components';

// Actions
import { ipcFind } from '../../actions';

// Hooks
import {
  useMediaQuery,
  useHover,
  useTranslation,
  useAudio
} from '../../hooks';

// Validation
import { propSong } from '../../validation/propTypes';

// Styles
import useLibrarySearchStyles from './LibrarySearch.style';

const LibrarySearch = ({ songs }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();
  const classes = useLibrarySearchStyles();

  const { set } = useAudio();
  const { t } = useTranslation();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });
  const isSmall = useMediaQuery(breakpoints => breakpoints.create(
    breakpoints.queries.minWidth,
    breakpoints.values.sm
  ));

  const handleSearch = (_, value) => ipcFind(IPC.CHANNEL.LIBRARY, {
    $some: [
      { $stringLoose: { 'metadata.album': value.toString() } },
      { $stringLoose: { 'metadata.albumlocalized': value.toString() } },
      { $stringLoose: { 'metadata.albumartist': value.toString() } },
      { $stringLoose: { 'metadata.albumartistlocalized': value.toString() } }
    ]
  });

  return (
    <Fragment>
      <div className={classes.root}>
        <InputSearch
          onSearch={handleSearch}
          onChange={handleSearch}
          className={classes.search}
        />
        <ButtonIcon
          ref={ref}
          small={!isSmall}
          icon="dotsVertical"
          onClick={() => setOpen(!open)}
        />
      </div>
      <Menu
        open={open}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <MenuItem
          primary={t('action.common.play', {
            mixins: { item: t('common.library') },
            transform: 'pascal'
          })}
          onClick={() => set(({
            name: t('common.library', { transform: 'pascal' }),
            collection: songs.sort((a, b) => {
              const aAlbumartist = (a.metadata.albumartist || '').toLowerCase();
              const bAlbumartist = (b.metadata.albumartist || '').toLowerCase();
              const aDate = (a.metadata.date || '').toLowerCase();
              const bDate = (b.metadata.date || '').toLowerCase();
              const aDisc = (a.metadata.disc.no || 1);
              const bDisc = (b.metadata.disc.no || 1);
              const aTrack = (a.metadata.track.no || 1);
              const bTrack = (b.metadata.track.no || 1);

              if (aAlbumartist < bAlbumartist) return -1;
              if (aAlbumartist > bAlbumartist) return 1;
              if (aDate < bDate) return -1;
              if (aDate > bDate) return 1;
              if (aDisc < bDisc) return -1;
              if (aDisc > bDisc) return 1;
              if (aTrack < bTrack) return -1;
              if (aTrack > bTrack) return 1;
              return 0;
            })
          }))}
        />
        <MenuItem
          primary={t('action.common.shuffle', {
            mixins: { item: t('common.library') },
            transform: 'pascal'
          })}
          onClick={() => set(({
            name: t('common.library', { transform: 'pascal' }),
            collection: shuffle(songs)
          }))}
        />
      </Menu>
    </Fragment>
  );
};

LibrarySearch.propTypes = {
  songs: PropTypes.arrayOf(propSong).isRequired
};

const mapStateToProps = state => ({
  songs: state.entities.songs.list
});

export default connect(
  mapStateToProps
)(LibrarySearch);
