import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconMenu from '@material-ui/icons/MoreVert';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';
import IconPlaylistAdd from '@material-ui/icons/PlaylistAdd';

// Core
import {
  ListItem,
  ListItemText,
  Hidden,
  IconButton
} from '@material-ui/core';

import { Tooltip } from '../../components';

const VirtualLibraryDivider = props => {
  const {
    classes,
    t,
    primary,
    secondary,
    onMenu,
    onPlaylistAdd,
    onPlaylistPlay
  } = props;

  return (
    <ListItem classes={{ root: classes.listItem }}>
      <ListItemText
        primary={primary}
        secondary={secondary}
        primaryTypographyProps={{
          noWrap: true,
          classes: { root: classes.block }
        }}
        secondaryTypographyProps={{
          noWrap: true,
          classes: { root: classes.block }
        }}
        classes={{ root: classes.dividerRoot }}
      />
      <Hidden smUp>
        <IconButton onClick={onMenu}>
          <IconMenu />
        </IconButton>
      </Hidden>
      <Hidden xsDown>
        <Tooltip
          disableTranslation
          title={t('action:play', { context: 'album' })}
        >
          <IconButton onClick={onPlaylistPlay}>
            <IconPlaylistPlay />
          </IconButton>
        </Tooltip>
        <Tooltip
          disableTranslation
          title={t('action:add', { context: 'playlist' })}
        >
          <IconButton onClick={onPlaylistAdd}>
            <IconPlaylistAdd />
          </IconButton>
        </Tooltip>
      </Hidden>
    </ListItem>
  );
};

VirtualLibraryDivider.propTypes = {
  classes: PropTypes.shape({
    block: PropTypes.string,
    dividerRoot: PropTypes.string,
    listItem: PropTypes.string
  }).isRequired,
  t: PropTypes.func.isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  onMenu: PropTypes.func.isRequired,
  onPlaylistAdd: PropTypes.func.isRequired,
  onPlaylistPlay: PropTypes.func.isRequired
};

export default VirtualLibraryDivider;
