import React from 'react';
import { connect } from 'react-redux';
import { STATUS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import { ButtonIcon } from '../ButtonIcon';

// Hooks
import { useAudio } from '../../hooks';

const ButtonPlay = ({ status, dispatch, ...rest }) => {
  const { play, pause } = useAudio();

  const handleClick = () => (status === STATUS.AUDIO.PLAYING ? pause() : play());

  return (
    <ButtonIcon
      {...rest}
      icon={status === STATUS.AUDIO.PLAYING ? 'pause' : 'play'}
      onClick={handleClick}
    />
  );
};

ButtonPlay.propTypes = {
  dispatch: PropTypes.func.isRequired,
  status: PropTypes.oneOf(Object.values(STATUS.AUDIO)).isRequired
};

const mapStateToProps = state => ({
  status: state.player.status
});

export default connect(
  mapStateToProps
)(ButtonPlay);
