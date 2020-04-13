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

import VirtualSongDividerAlbum from './VirtualSongDividerAlbum.private';
import VirtualSongDividerDisc from './VirtualSongDividerDisc.private';

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
    localized,
    createSong,
    handleMenu
  } = data;

  const renderItem = () => {
    const { divider, ...renderProps } = library[index];

    switch (divider) {
      case 'album':
        return (
          <VirtualSongDividerAlbum
            classes={classes}
            handleMenu={handleMenu}
            {...renderProps}
          />
        );
      case 'disc':
        return (
          <VirtualSongDividerDisc
            classes={classes}
            handleMenu={handleMenu}
            {...renderProps}
          />
        );
      default: {
        const {
          _id,
          metadata: {
            title,
            titlelocalized,
            artist,
            artistlocalized,
            track
          },
          format: { duration }
        } = renderProps;
        const isActive = (current === _id);

        return (
          <ListItem
            button
            onClick={() => createSong(renderProps)}
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
              primary={localized ? (titlelocalized || title) : title}
              secondary={`${localized ? (artistlocalized || artist) : artist} (${formatTime(duration)})`}
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
    handleMenu: PropTypes.func.isRequired,
    localized: PropTypes.bool.isRequired,
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
          add: PropTypes.string.isRequired,
          album: PropTypes.string.isRequired
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
