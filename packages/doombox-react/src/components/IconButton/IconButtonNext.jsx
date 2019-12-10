import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconNext from '@material-ui/icons/SkipNext';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonNext = ({ className }) => {
  const { next } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      className={className}
      onClick={() => next()}
    >
      <IconNext />
    </IconButton>
  );
};

IconButtonNext.propTypes = {
  className: PropTypes.string
};

IconButtonNext.defaultProps = {
  className: null
};

export default IconButtonNext;
