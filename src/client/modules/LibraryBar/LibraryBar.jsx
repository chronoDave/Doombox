import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { shuffle, sortMetadata } from '@doombox-utils';
import { IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  ButtonIcon,
  Search,
  Popper,
  MenuItem
} from '../../components';

// Actions
import { ipcFind } from '../../actions';

// Hooks
import {
  useMediaQuery,
  useTimeoutOpen,
  useTranslation,
  useAudio
} from '../../hooks';

// Validation
import { propSong } from '../../validation/propTypes';

// Styles
import useLibraryBarStyles from './LibraryBar.styles';

const LibraryBar = ({ songs }) => {
  const ref = useRef();
  const classes = useLibraryBarStyles();

  const { set } = useAudio();
  const { t } = useTranslation();
  const isSmall = useMediaQuery(({ create }) => create('minWidth', 'sm'));

  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();

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
          onMouseEnter={() => open && handleEnter()}
          onMouseLeave={handleLeave}
        />
      </div>
      <Popper
        open={open}
        anchorEl={ref.current}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="right-start"
      >
        <MenuItem
          primary={t('action.common.play', {
            mixins: { item: t('common.library') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            set(({
              name: t('common.library', { transform: 'pascal' }),
              collection: songs.sort((a, b) => sortMetadata(a, b, [
                'albumartist',
                'year',
                'date',
                'disc',
                'track'
              ]))
            }));
          }}
        />
        <MenuItem
          primary={t('action.common.shuffle', {
            mixins: { item: t('common.library') },
            transform: 'pascal'
          })}
          onClick={() => {
            setOpen(false);
            set(({
              name: t('common.library', { transform: 'pascal' }),
              collection: shuffle(songs)
            }));
          }}
        />
      </Popper>
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
