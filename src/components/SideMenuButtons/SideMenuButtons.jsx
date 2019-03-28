import React from 'react';
import PropTypes from 'prop-types';

// Icons
import PlayIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import AddToPlaylistIcon from '@material-ui/icons/PlaylistAdd';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { GridContainer } from '../Grid';

// Style
import SideMenuButtonsStyle from './SideMenuButtonsStyle';

const SideMenuButtons = props => {
  const {
    onClickPlay,
    onClickShuffle,
    onClickAddToPlaylist,
    duration,
    classes
  } = props;

  return (
    <GridContainer
      alignItems="center"
      justify="space-between"
    >
      <div className={classes.root}>
        <IconButton
          onClick={onClickPlay}
          color="inherit"
        >
          <PlayIcon />
        </IconButton>
        <IconButton
          onClick={onClickShuffle}
          color="inherit"
        >
          <ShuffleIcon />
        </IconButton>
        <IconButton
          onClick={onClickAddToPlaylist}
          color="inherit"
        >
          <AddToPlaylistIcon />
        </IconButton>
      </div>
      <Typography variant="subtitle1">
        {duration}
      </Typography>
    </GridContainer>
  );
};

SideMenuButtons.propTypes = {
  onClickPlay: PropTypes.func,
  onClickShuffle: PropTypes.func,
  onClickAddToPlaylist: PropTypes.func,
  duration: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(SideMenuButtonsStyle)(SideMenuButtons);
