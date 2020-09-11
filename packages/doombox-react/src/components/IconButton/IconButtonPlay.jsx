import React from 'react';
import { connect } from 'react-redux';
import { STATUS } from '@doombox/utils';
import PropTypes from 'prop-types';

// Icons
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Hooks
import { useAudio } from '../../hooks';

import IconButton from './IconButton';

const IconButtonPlay = ({ status }) => {
  const { pause, play } = useAudio();

  const handleClick = () => {
    if (status === STATUS.AUDIO.PLAYING) {
      pause();
    } else {
      play();
    }
  };

  return (
    <IconButton onClick={handleClick}>
      {status === STATUS.AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
    </IconButton>
  );
};

IconButtonPlay.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired
};

const mapStateToProps = state => ({
  status: state.audio.player.status
});

export default connect(
  mapStateToProps
)(IconButtonPlay);
