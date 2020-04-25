import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Avatar as MuiAvatar } from '@material-ui/core';

const Avatar = ({ alt, icon, ...rest }) => (
  <MuiAvatar
    alt={alt}
    {...rest}
  >
    {icon || alt.slice(0, 1)}
  </MuiAvatar>
);

Avatar.propTypes = {
  alt: PropTypes.string.isRequired,
  icon: PropTypes.node
};

Avatar.defaultProps = {
  icon: null
};

export default Avatar;
