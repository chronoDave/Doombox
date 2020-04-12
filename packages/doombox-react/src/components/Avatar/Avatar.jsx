import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Avatar as MuiAvatar } from '@material-ui/core';

// Utils
import { pathToUrl } from '../../utils';

const Avatar = props => {
  const {
    alt,
    src,
    icon,
    ...rest
  } = props;

  return (
    <MuiAvatar
      alt={alt}
      src={src && pathToUrl(src)}
      {...rest}
    >
      {icon || alt.slice(0, 1)}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  icon: PropTypes.node
};

Avatar.defaultProps = {
  src: null,
  icon: null
};

export default Avatar;
