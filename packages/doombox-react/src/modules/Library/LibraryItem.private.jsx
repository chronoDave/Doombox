import React, { memo } from 'react';
import { areEqual } from 'react-window';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import { Typography } from '../../components';

// Utils
import { formatTime } from '../../utils';
import {
  propSong,
  propSongFormat,
  propSongMetadata
} from '../../utils/propTypes';

import LibraryItemDivider from './LibraryItemDivider.private';

const VirtualLibraryItem = memo(({ index, style, data }) => {
  const {
    // Style
    classes,
    current,
    library,
    dense,
    // Func
    createSong,
    handleMenu,
    handlePlaylistAdd,
    handlePlaylistPlay,
    t
  } = data;
  const {
    _id,
    divider,
    format,
    metadata
  } = library[index];
  const active = (current === _id && !divider);

  return (
    <div
      className={clsx({ [classes.active]: active })}
      style={style}
    >
      {divider ? (
        <LibraryItemDivider
          classes={classes}
          t={t}
          primary={divider.album}
          secondary={[
            divider.albumartist,
            divider.year,
            t('albumCount', { count: divider.collection.length }),
            formatTime(divider.duration)
          ].join(' \u2022 ')}
          onMenu={event => handleMenu(event, {
            name: divider.album,
            collection: divider.collection
          })}
          onPlaylistAdd={() => handlePlaylistAdd(divider.collection)}
          onPlaylistPlay={() => handlePlaylistPlay({
            name: divider.album,
            collection: divider.collection
          })}
        />
      ) : (
        <ListItem
          button
          onClick={() => createSong(library[index])}
          classes={{ root: classes.listItem }}
        >
          {active && <div className={classes.activeBar} />}
          <ListItemIcon classes={{ root: classes.dividerIcon }}>
            <Typography variant="caption">
              {metadata.track.no ?
                `${metadata.track.no}.` :
                '??'
              }
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary={metadata.title}
            primaryTypographyProps={{
              noWrap: true,
              variant: dense ? 'body2' : 'body1',
              display: 'block'
            }}
            secondary={`${metadata.artist} (${formatTime(format.duration)})`}
            secondaryTypographyProps={{
              noWrap: true,
              display: 'block'
            }}
          />
        </ListItem>
      )}
    </div>
  );
}, areEqual);

VirtualLibraryItem.displayName = 'LibraryItem';
VirtualLibraryItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    classes: PropTypes.shape({
      active: PropTypes.string,
      dividerIcon: PropTypes.string,
      block: PropTypes.string,
      listItem: PropTypes.string,
      activeBar: PropTypes.string
    }).isRequired,
    library: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      divider: PropTypes.shape({
        album: PropTypes.string,
        albumartist: PropTypes.string,
        year: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string
        ]).isRequired,
        size: PropTypes.number,
        duration: PropTypes.number,
        collection: PropTypes.arrayOf(propSong)
      }),
      format: propSongFormat,
      metadata: propSongMetadata
    })).isRequired,
    current: PropTypes.string,
    dense: PropTypes.bool,
    createSong: PropTypes.func.isRequired,
    handleMenu: PropTypes.func.isRequired,
    handlePlaylistAdd: PropTypes.func.isRequired,
    handlePlaylistPlay: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }).isRequired
};

export default VirtualLibraryItem;
