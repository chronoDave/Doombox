import React from 'react';
import PropTypes from 'prop-types';

// Icons
import IconPrevious from '@material-ui/icons/SkipPrevious';

// Core
import { IconButton } from '@material-ui/core';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const IconButtonPrevious = ({ className }) => {
  const { previous } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <IconButton
      className={className}
      onClick={() => previous()}
    >
      <IconPrevious />
    </IconButton>
  );
};

IconButtonPrevious.propTypes = {
  className: PropTypes.string
};

IconButtonPrevious.defaultProps = {
  className: null
};

export default IconButtonPrevious;
