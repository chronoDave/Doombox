import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconStop from '@material-ui/icons/Stop';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonStop = ({ className }) => {
  const { stop } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      onClick={() => stop()}
      className={className}
    >
      <IconStop />
    </IconButton>
  );
};

IconButtonStop.propTypes = {
  className: PropTypes.string
};

IconButtonStop.defaultProps = {
  className: null
};


export default IconButtonStop;
