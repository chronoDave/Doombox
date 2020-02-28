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

// Validation
import { propVirtualAction } from '../../../validation/propTypes';

const VirtualLabelHeader = props => {
  const {
    classes,
    primary,
    secondary,
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
    src: {},
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
  actions: PropTypes.shape({
    menu: propVirtualAction.isRequired,
    play: propVirtualAction.isRequired,
    add: propVirtualAction.isRequired,
    favorite: propVirtualAction.isRequired
  }).isRequired,
};

export default VirtualLabelHeader;
