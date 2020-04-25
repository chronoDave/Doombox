import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconMenu from '@material-ui/icons/MoreVert';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';
import IconPlaylistAdd from '@material-ui/icons/PlaylistAdd';

// Core
import {
  Box,
  Hidden,
  IconButton,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import {
  Tooltip,
  Icon
} from '../../../components';

// Actions
import {
  playLibrary,
  addLibrary,
  createPlaylist
} from '../../../actions';

// Validation
import {
  propImage,
  propSongImage
} from '../../../validation/propTypes';

const VirtualSongDividerAlbum = props => {
  const {
    classes,
    primary,
    secondary,
    cover,
    tracks,
    tooltip,
    handleMenu
  } = props;

  const query = { $or: tracks.map(track => ({ _id: track })) };
  const playlist = {
    name: primary,
    cover,
    collection: tracks
  };

  return (
    <ListItem classes={{ root: classes.listRoot }}>
      <ListItemText
        primary={primary}
        secondary={secondary}
        primaryTypographyProps={{ noWrap: true, display: 'block' }}
        secondaryTypographyProps={{ noWrap: true, display: 'block' }}
        classes={{ root: classes.dividerAlbumText }}
      />
      <Box display="flex">
        <Hidden smUp>
          <Tooltip disableTranslation title={tooltip.menu}>
            <IconButton
              onClick={event => handleMenu(
                {
                  type: 'divider',
                  anchor: event.currentTarget
                },
                { query, ...playlist }
              )}
            >
              <IconMenu />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Hidden xsDown>
          <Tooltip disableTranslation title={tooltip.play}>
            <IconButton onClick={() => playLibrary({ query })}>
              <IconPlaylistPlay />
            </IconButton>
          </Tooltip>
          <Tooltip disableTranslation title={tooltip.add}>
            <IconButton onClick={() => addLibrary({ query })}>
              <IconPlaylistAdd />
            </IconButton>
          </Tooltip>
          <Tooltip disableTranslation title={tooltip.favorite}>
            <IconButton onClick={() => createPlaylist(playlist)}>
              <Icon type="playlist_star" />
            </IconButton>
          </Tooltip>
        </Hidden>
      </Box>
    </ListItem>
  );
};

VirtualSongDividerAlbum.propTypes = {
  classes: PropTypes.shape({
    listRoot: PropTypes.string.isRequired,
    dividerAlbumText: PropTypes.string.isRequired
  }).isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  cover: PropTypes.oneOfType([
    propImage,
    propSongImage
  ]),
  handleMenu: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    play: PropTypes.string.isRequired,
    add: PropTypes.string.isRequired,
    favorite: PropTypes.string.isRequired,
    menu: PropTypes.string.isRequired
  }).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.string).isRequired
};

VirtualSongDividerAlbum.defaultProps = {
  cover: null
};

export default VirtualSongDividerAlbum;
