import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

import { Typography } from '../../../components';

// Utils
import { formatTime } from '../../../utils';

// Validation
import { propSong } from '../../../validation/propTypes';

const VirtualFavoritesItem = ({ index, style, data }) => {
  const {
    classes,
    dense,
    favorites,
    current,
    createSong,
    setMenu
  } = data;
  const song = favorites[index];

  const {
    _id,
    metadata: { title, artist },
    format: { duration }
  } = song;
  const isActive = current === _id;

  return (
    <div style={style} className={classes.root}>
      <ListItem
        button
        onClick={() => createSong(song)}
        classes={{ root: classes.listRoot }}
        className={clsx({ [classes.itemActive]: isActive })}
        onContextMenu={event => setMenu({
          anchor: event.currentTarget,
          payload: _id
        })}
      >
        {isActive && <div className={classes.itemActiveBar} />}
        <ListItemIcon classes={{ root: classes.itemTrack }}>
          <Typography variant="caption">
            {index + 1}
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
    </div>
  );
};

VirtualFavoritesItem.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    dense: PropTypes.bool.isRequired,
    current: PropTypes.string,
    createSong: PropTypes.func.isRequired,
    setMenu: PropTypes.func.isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string.isRequired,
      listRoot: PropTypes.string.isRequired,
      itemActive: PropTypes.string.isRequired,
      itemActiveBar: PropTypes.string.isRequired,
      itemTrack: PropTypes.string.isRequired,
      dividerAlbumText: PropTypes.string.isRequired,
      dividerDiscLine: PropTypes.string.isRequired
    }),
    favorites: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({
        divider: PropTypes.string.isRequired,
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        tooltip: PropTypes.shape({
          play: PropTypes.string.isRequired,
          add: PropTypes.string.isRequired,
          album: PropTypes.string.isRequired
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

export default VirtualFavoritesItem;
