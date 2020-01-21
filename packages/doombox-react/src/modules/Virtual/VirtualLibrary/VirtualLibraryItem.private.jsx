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

import { Typography } from '../../../components';

// Utils
import { formatTime } from '../../../utils';

import VirtualLibraryDivider from './VirtualLibraryDivider.private';

const VirtualLibraryItem = memo(({ index, style, data }) => {
  const {
    // Style
    classes,
    current,
    dense,
    library,
    // Func
    createSong,
    setAnchorEl,
    setAlbum,
    setPlaylist,
    addPlaylist,
    setDialog,
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
        <VirtualLibraryDivider
          classes={classes}
          t={t}
          setDialog={setDialog}
          primary={divider.primary}
          secondary={divider.secondary}
          onMenu={event => {
            setAlbum({ name: divider.primary, collection: divider.album });
            setAnchorEl(event.currentTarget);
          }}
          onPlaylistAdd={() => addPlaylist(divider.album)}
          onPlaylistPlay={() => {
            setPlaylist(divider.primary, divider.album);
            createSong();
          }}
          onDialog={() => {
            setAlbum({
              name: divider.primary,
              collection: divider.album
            });
            setDialog(true);
          }}
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
              {`${metadata.track.no}.`}
            </Typography>
          </ListItemIcon>
          <ListItemText
            primary={metadata.title}
            primaryTypographyProps={{
              noWrap: true,
              variant: dense ? 'body2' : 'body1',
              classes: { root: classes.block }
            }}
            secondary={`${metadata.artist} (${formatTime(format.duration)})`}
            secondaryTypographyProps={{
              noWrap: true,
              classes: { root: classes.block }
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
    current: PropTypes.string,
    dense: PropTypes.bool,
    library: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      divider: PropTypes.shape({
        primary: PropTypes.string.isRequired,
        secondary: PropTypes.string.isRequired,
        album: PropTypes.arrayOf(PropTypes.shape({}))
      }),
      format: PropTypes.shape({
        duration: PropTypes.string
      }),
      metadata: {
        artist: PropTypes.string
      }
    })).isRequired,
    createSong: PropTypes.func.isRequired,
    setAnchorEl: PropTypes.func.isRequired,
    setAlbum: PropTypes.func.isRequired,
    setPlaylist: PropTypes.func.isRequired,
    addPlaylist: PropTypes.func.isRequired,
    setDialog: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  }).isRequired
};

export default VirtualLibraryItem;
