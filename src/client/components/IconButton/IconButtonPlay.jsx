import React from 'react';
import { connect } from 'react-redux';
import { STATUS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Icons
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Hooks
import { useAudio } from '../../hooks';

import IconButton from './IconButton';

const IconButtonPlay = ({ status, dispatch, ...rest }) => {
  const { play, pause } = useAudio();

  const handleClick = () => (status === STATUS.AUDIO.PLAYING ? pause() : play());

  return (
    <IconButton {...rest} onClick={handleClick}>
      {status === STATUS.AUDIO.PLAYING ? (
        <IconPause />
      ) : (
        <IconPlay />
      )}
    </IconButton>
  );
};

IconButtonPlay.propTypes = {
  dispatch: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired
};

const mapStateToProps = state => ({
  status: state.player.status
});

export default connect(
  mapStateToProps
)(IconButtonPlay);
