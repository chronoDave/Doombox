import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconPlaylistAdd from '@material-ui/icons/PlaylistAdd';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  Tooltip,
  Typography
} from '../../../components';

const VirtualLabelHeader = props => {
  const {
    classes,
    primary,
    secondary,
    tooltip,
    onPlay,
    onAdd
  } = props;

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
  tooltip: PropTypes.shape({
    add: PropTypes.string.isRequired,
    play: PropTypes.string.isRequired
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default VirtualLabelHeader;
