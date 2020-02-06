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
  Typography,
  Tooltip
} from '../../components';

const LabelItemHeader = props => {
  const {
    classes,
    primary,
    secondary,
    maxHeight,
    onPlaylistAdd,
    onPlaylistPlay,
    t
  } = props;

  return (
    <Box
      display="flex"
      alignItems="center"
      height="100%"
      maxHeight={maxHeight}
    >
      <Box
        display="flex"
        flexDirection="column"
        pr={1}
      >
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
      <Tooltip
        disableTranslation
        title={t('action:play', { context: 'label' })}
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
      <div className={classes.divider} />
    </Box>
  );
};

LabelItemHeader.propTypes = {
  classes: PropTypes.shape({
    divider: PropTypes.string.isRequired
  }).isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  maxHeight: PropTypes.number.isRequired,
  onPlaylistAdd: PropTypes.func.isRequired,
  onPlaylistPlay: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default LabelItemHeader;
