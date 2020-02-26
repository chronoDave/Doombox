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

import { Tooltip } from '../../../components';

const VirtualSongDividerAlbum = props => {
  const {
    classes,
    primary,
    secondary,
    onMenu,
    onPlay,
    onAdd,
    tooltip
  } = props;

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
        <IconButton onClick={onMenu}>
          <IconMenu />
        </IconButton>
      </Hidden>
      <Hidden xsDown>
        <Tooltip disableTranslation title={tooltip.play}>
          <IconButton onClick={onPlay}>
            <IconPlaylistPlay />
          </IconButton>
        </Tooltip>
        <Tooltip disableTranslation title={tooltip.add}>
          <IconButton onClick={onAdd}>
            <IconPlaylistAdd />
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
  onMenu: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    play: PropTypes.string.isRequired,
    add: PropTypes.string.isRequired
  }).isRequired
};

export default VirtualSongDividerAlbum;
