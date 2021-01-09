import React, { Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import { shuffle, sortMetadata } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { ButtonIcon, Popper, MenuItem } from '../../components';

// Hooks
import {
  useMediaQuery,
  useTimeoutOpen,
  useTranslation,
  useAudio
} from '../../hooks';

// Validation
import { propSong } from '../../validation/propTypes';

const LibraryMenu = ({ collection }) => {
  const ref = useRef();

  const { set } = useAudio();
  const { t } = useTranslation();
  const isSmall = useMediaQuery(({ create }) => create('minWidth', 'sm'));

  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();

  return (
    <Fragment>
      <ButtonIcon
        ref={ref}
        small={!isSmall}
        icon="dotsVertical"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => open && handleEnter()}
        onMouseLeave={handleLeave}
      />
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
              collection
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
              collection: shuffle(collection)
            }));
          }}
        />
      </Popper>
    </Fragment>
  );
};

LibraryMenu.propTypes = {
  collection: PropTypes.arrayOf(propSong).isRequired
};

const mapStateToProps = state => ({
  collection: state.entities.songs.list
    .sort(sortMetadata(['albumartist', 'year', 'date', 'disc', 'track']))
});

export default connect(
  mapStateToProps
)(LibraryMenu);
