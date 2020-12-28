import React, { Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { shuffle, sortMetadata } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  ButtonIcon,
  Search,
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
import useLibraryBarStyles from './LibraryBar.styles';

const LibraryBar = ({ songs }) => {
  const [open, setOpen] = useState(false);

  const ref = useRef();
  const classes = useLibraryBarStyles();

  const { set } = useAudio();
  const { t } = useTranslation();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });
  const isSmall = useMediaQuery(({ create }) => create('minWidth', 'sm'));

  const handleSearch = (_, value) => ipcFind(IPC.CHANNEL.LIBRARY, {
    $some: [
      { $stringLoose: { album: value.toString() } },
      { $stringLoose: { albumlocalized: value.toString() } },
      { $stringLoose: { albumartist: value.toString() } },
      { $stringLoose: { albumartistlocalized: value.toString() } }
    ]
  });

  return (
    <Fragment>
      <div className={classes.root}>
        <Search
          onSearch={handleSearch}
          onChange={handleSearch}
          className={classes.search}
        />
        <ButtonIcon
          ref={ref}
          small={!isSmall}
          icon="dotsVertical"
          onClick={() => setOpen(!open)}
          onMouseEnter={() => open && onEnter()}
          onMouseLeave={onLeave}
        />
      </div>
      <Menu
        open={open}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        placement="right-start"
      >
        <MenuItem
          primary={t('action.common.play', {
            mixins: { item: t('common.library') },
            transform: 'pascal'
          })}
          onClick={() => set(({
            name: t('common.library', { transform: 'pascal' }),
            collection: songs.sort((a, b) => sortMetadata(a, b, [
              'albumartist',
              'year',
              'date',
              'disc',
              'track'
            ]))
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

LibraryBar.propTypes = {
  songs: PropTypes.arrayOf(propSong).isRequired
};

const mapStateToProps = state => ({
  songs: state.entities.songs.list
});

export default connect(
  mapStateToProps
)(LibraryBar);
