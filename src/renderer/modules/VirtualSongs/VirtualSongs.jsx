import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  VirtualList,
  VirtualListItem,
  Popper,
  MenuItem
} from '../../components';
import { populateSearchSongs } from '../../redux';
import { useTranslation, useAudio, useTimeoutOpen } from '../../hooks';
import { MIXINS } from '../../utils';
import { propSong } from '../../validation/propTypes';

const VirtualSongs = ({ songs, current }) => {
  const [menu, setMenu] = useState({ anchorEl: null, song: null });

  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const { create, add } = useAudio();
  const { t, getLocalizedTag } = useTranslation();

  return (
    <Fragment>
      <VirtualList
        length={songs.length}
        size={MIXINS.virtual.item * 2}
      >
        {({ style, index }) => {
          const song = songs[index];

          if (!song) return null;
          return (
            <VirtualListItem
              key={song._id}
              style={style}
              active={song._id === current}
              primary={getLocalizedTag(song, 'title')}
              secondary={[
                getLocalizedTag(song, 'artist'),
                getLocalizedTag(song, 'album')
              ].join(' \u2022 ')}
              onClick={() => create(song)}
              onContextMenu={event => {
                setMenu({ anchorEl: event.currentTarget, song });
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
            add(menu.song);
          }}
        />
      </Popper>
    </Fragment>
  );
};

VirtualSongs.defaultProps = {
  current: null
};

VirtualSongs.propTypes = {
  current: PropTypes.string,
  songs: PropTypes.arrayOf(propSong).isRequired
};

const mapStateToProps = state => ({
  current: state.player.metadata._id,
  songs: populateSearchSongs(state)
});

export default connect(
  mapStateToProps
)(VirtualSongs);
