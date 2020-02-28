import React from 'react';
import { ACTION } from '@doombox/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

import { Typography } from '../../../components';

import VirtualSongDividerAlbum from './VirtualSongDividerAlbum.private';
import VirtualSongDividerDisc from './VirtualSongDividerDisc.private';

// Actions
import { libraryActionPlaylist } from '../../../actions';

// Utils
import { formatTime } from '../../../utils';

// Validation
import { propSong } from '../../../validation/propTypes';

const VirtualSongItem = ({ index, style, data }) => {
  const {
    classes,
    dense,
    library,
    current,
    createSong
  } = data;

  const renderItem = () => {
    switch (library[index].divider) {
      case 'album': {
        const { handler, tracks, ...rest } = library[index];
        const album = { name: rest.primary, collection: tracks };

        return (
          <VirtualSongDividerAlbum
            classes={classes}
            onMenu={event => handler.context(event, album)}
            onPlay={() => libraryActionPlaylist(ACTION.AUDIO.PLAYLIST_SET, album)}
            onAdd={() => libraryActionPlaylist(ACTION.AUDIO.PLAYLIST_ADD, album)}
            {...rest}
          />
        );
      }
      case 'disc':
        return (
          <VirtualSongDividerDisc
            classes={classes}
            primary={library[index].primary}
          />
        );
      default: {
        const {
          _id,
          metadata: { title, artist, track },
          format: { duration }
        } = library[index];
        const isActive = (current === _id);

        return (
          <ListItem
            button
            onClick={() => createSong(library[index])}
            classes={{ root: classes.listRoot }}
            className={clsx({ [classes.itemActive]: isActive })}
          >
            {isActive && <div className={classes.itemActiveBar} />}
            <ListItemIcon classes={{ root: classes.itemTrack }}>
              <Typography variant="caption">
                {track.no ? `${track.no}.` : '??'}
              </Typography>
            </ListItemIcon>
            <ListItemText
              primary={title}
              secondary={`${artist} (${formatTime(duration)})`}
              primaryTypographyProps={{
                noWrap: true,
                display: 'block',
                variant: dense ? 'body2' : 'body1'
              }}
              secondaryTypographyProps={{ noWrap: true, display: 'block' }}
            />
          </ListItem>
        );
      }
    }
  };

  return (
    <div style={style} className={classes.root}>
      {renderItem()}
    </div>
  );
};

VirtualSongItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    dense: PropTypes.bool.isRequired,
    current: PropTypes.string,
    createSong: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      listRoot: PropTypes.string.isRequired,
      itemActive: PropTypes.string.isRequired,
      itemActiveBar: PropTypes.string.isRequired,
      itemTrack: PropTypes.string.isRequired,
      dividerAlbumText: PropTypes.string.isRequired,
      dividerDiscLine: PropTypes.string.isRequired
    }),
    library: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        divider: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        tooltip: PropTypes.shape({
          play: PropTypes.string.isRequired,
          add: PropTypes.string.isRequired
        }).isRequired,
        handler: PropTypes.shape({
          context: PropTypes.func.isRequired
        }).isRequired,
        tracks: PropTypes.arrayOf(PropTypes.string).isRequired
      }),
      PropTypes.shape({
        divider: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired
      }),
      propSong
    ])).isRequired
  }).isRequired
};

export default VirtualSongItem;
