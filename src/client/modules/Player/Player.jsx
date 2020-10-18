import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Hidden, Typography } from '../../components';

import PlayerProgress from './PlayerProgress.private';
import PlayerSlider from './PlayerSlider.private';
import PlayerButtons from './PlayerButtons.private';

// Styles
import { usePlayerStyles } from './Player.style';

const Player = props => {
  const {
    title,
    artist,
    cover
  } = props;
  const classes = usePlayerStyles({ cover });

  return (
    <Box display="flex" flexDirection="column">
      <div className={classes.metadataImage}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Typography clamp={2} align="center">
            {title}
          </Typography>
          <Typography variant="body2" clamp={2} align="center">
            {artist}
          </Typography>
        </Box>
        <Hidden mediumUp>
          <PlayerButtons />
        </Hidden>
        <Hidden mediumDown>
          <PlayerProgress />
        </Hidden>
      </div>
      <PlayerSlider />
      <Hidden mediumDown>
        <Box p={1}>
          <PlayerButtons />
        </Box>
      </Hidden>
    </Box>
  );
};

Player.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string
};

Player.defaultProps = {
  title: 'No song selected',
  artist: ''
};

const mapStateToProps = state => ({
  cover: state.player.metadata.cover
    .map(image => state.entities.images.map[image])[0],
  title: state.player.metadata.title,
  artist: state.player.metadata.artist
});

export default connect(
  mapStateToProps
)(Player);
