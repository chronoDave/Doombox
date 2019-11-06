import React from 'react';
import { connect } from 'react-redux';

// Core
import { Box } from '@material-ui/core';

import { PaperImage } from '../../components/Paper';
import { Typography } from '../../components/Typography';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { AUDIO_HOOKS } from '../../utils/const';

// Validation
import { propPlaylist } from '../../validation/propTypes';

// Styles
import { usePlaylistStyle } from './Playlist.style';

const validateImage = playlist => (playlist ? playlist.image ? playlist.image.path : null : null);

const PlaylistBanner = ({ current }) => {
  const classes = usePlaylistStyle();
  const { playlist } = useAudio(AUDIO_HOOKS.PLAYLIST);

  return (
    <PaperImage
      classes={{ root: classes.paperImageRoot }}
      path={validateImage(current)}
    >
      <Box p={2} display="flex">
        <Box flexGrow={1}>
          <Typography>
            {`${current ? current.title : 'Master'} (${playlist.length})`}
          </Typography>
        </Box>
      </Box>
    </PaperImage>
  );
};

PlaylistBanner.propTypes = {
  current: propPlaylist
};

PlaylistBanner.defaultProps = {
  current: null
};

const mapStateToProps = state => ({
  current: state.playlist.current
});

export default connect(
  mapStateToProps
)(PlaylistBanner);
