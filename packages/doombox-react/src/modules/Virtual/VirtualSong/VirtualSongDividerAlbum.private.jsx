import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconMenu from '@material-ui/icons/MoreVert';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';
import IconPlaylistAdd from '@material-ui/icons/PlaylistAdd';

// Core
import {
  Hidden,
  IconButton,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import {
  Tooltip,
  Icon
} from '../../../components';

// Validation
import { propVirtualAction } from '../../../validation/propTypes';

const VirtualSongDividerAlbum = props => {
  const {
    classes,
    primary,
    secondary,
    cover,
    tracks,
    actions: {
      menu,
      play,
      add,
      favorite
    }
  } = props;

  const payload = {
    name: primary,
    src: { path: cover },
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
      <Hidden smUp>
        <Tooltip disableTranslation title={menu.tooltip}>
          <IconButton onClick={event => menu.onClick(event, payload)}>
            <IconMenu />
          </IconButton>
        </Tooltip>
      </Hidden>
      <Hidden xsDown>
        <Tooltip disableTranslation title={play.tooltip}>
          <IconButton onClick={() => play.onClick(payload)}>
            <IconPlaylistPlay />
          </IconButton>
        </Tooltip>
        <Tooltip disableTranslation title={add.tooltip}>
          <IconButton onClick={() => add.onClick(payload)}>
            <IconPlaylistAdd />
          </IconButton>
        </Tooltip>
        <Tooltip disableTranslation title={favorite.tooltip}>
          <IconButton onClick={() => favorite.onClick(payload)}>
            <Icon type="playlist_star" />
          </IconButton>
        </Tooltip>
      </Hidden>
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
  cover: PropTypes.string,
  tracks: PropTypes.arrayOf(PropTypes.string).isRequired,
  actions: PropTypes.shape({
    menu: propVirtualAction.isRequired,
    play: propVirtualAction.isRequired,
    add: propVirtualAction.isRequired,
    favorite: propVirtualAction.isRequired
  }).isRequired,
};

VirtualSongDividerAlbum.defaultProps = {
  cover: null
};

export default VirtualSongDividerAlbum;
