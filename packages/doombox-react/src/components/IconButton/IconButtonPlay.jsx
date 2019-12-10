import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconPlay from '@material-ui/icons/PlayArrow';
import IconPause from '@material-ui/icons/Pause';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK, STATUS } from '../../utils/const';

const IconButtonPlay = ({ className }) => {
  const { play, pause } = useAudio(HOOK.AUDIO.METHOD);
  const { status } = useAudio(HOOK.AUDIO.CURRENT);

  return (
    <IconButton
      onClick={() => (status === STATUS.AUDIO.PLAYING ? pause() : play())}
      className={className}
    >
      {status === STATUS.AUDIO.PLAYING ? <IconPause /> : <IconPlay />}
    </IconButton>
  );
};

IconButtonPlay.propTypes = {
  className: PropTypes.string
};

IconButtonPlay.defaultProps = {
  className: null
};

export default IconButtonPlay;
