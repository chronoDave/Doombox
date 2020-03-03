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
  IconButton
} from '@material-ui/core';

import {
  Tooltip,
  Typography,
  Icon
} from '../../../components';

// Actions
import {
  playLibrary,
  addLibrary,
  createPlaylist
} from '../../../actions';

// Validation
import { } from '../../../validation/propTypes';

const VirtualLabelHeader = props => {
  const {
    classes,
    primary,
    secondary,
    tracks,
    tooltip,
    handleMenu
  } = props;

  const query = { $or: tracks.flat().map(track => ({ _id: track })) };
  const playlist = {
    name: primary,
    cover: {},
    collection: tracks.flat()
  };

  return (
    <Box display="flex" alignItems="center" px={2}>
      <Box display="flex" flexDirection="column">
        <Typography variant="body2" clamp={1}>
          {primary}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          clamp={1}
        >
          {secondary}
        </Typography>
      </Box>
      <Hidden smUp>
        <Tooltip disableTranslation title={tooltip.menu}>
          <IconButton
            onClick={event => handleMenu({
              anchorEl: event.currentTarget,
              payload: { query, ...playlist }
            })}
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
      <div className={classes.divider} />
    </Box>
  );
};

VirtualLabelHeader.propTypes = {
  classes: PropTypes.shape({
    divider: PropTypes.string.isRequired
  }).isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string)
  ).isRequired,
  handleMenu: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    play: PropTypes.string.isRequired,
    add: PropTypes.string.isRequired,
    favorite: PropTypes.string.isRequired,
    menu: PropTypes.string.isRequired
  }).isRequired,
};

export default VirtualLabelHeader;
