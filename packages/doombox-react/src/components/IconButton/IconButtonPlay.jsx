import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icons
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Types
import { STATUS } from '../../../../doombox-types';

// Hooks
import { useAudio } from '../../hooks';

import IconButton from './IconButton';

const IconButtonPlay = ({ status, dispatch, ...rest }) => {
  const { pause, play } = useAudio();

  const handleClick = () => {
    if (status === STATUS.AUDIO.PLAYING) {
      pause();
    } else {
      play();
    }
  };

  return (
    <IconButton onClick={handleClick} {...rest}>
      {status === STATUS.AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
    </IconButton>
  );
};

IconButtonPlay.propTypes = {
  dispatch: PropTypes.func,
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired
};

IconButtonPlay.defaultProps = {
  dispatch: null
};

const mapStateToProps = state => ({
  status: state.player.status
});

export default connect(
  mapStateToProps
)(IconButtonPlay);
