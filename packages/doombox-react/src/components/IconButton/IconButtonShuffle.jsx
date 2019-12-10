import React from 'react';
import PropTypes from 'prop-types';

// Icons
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonShuffle = ({ className }) => {
  const { shuffle } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      onClick={() => shuffle()}
      className={className}
    >
      <ShuffleIcon />
    </IconButton>
  );
};

IconButtonShuffle.propTypes = {
  className: PropTypes.string
};

IconButtonShuffle.defaultProps = {
  className: null
};

export default IconButtonShuffle;
