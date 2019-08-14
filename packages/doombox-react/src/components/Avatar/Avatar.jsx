import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Avatar as MuiAvatar } from '@material-ui/core';

// Style
import { useAvatarStyle } from './Avatar.style';

// Utils
import { normalizeUrl } from '../../utils';

const Avatar = ({ path, fallback }) => {
  const classes = useAvatarStyle();

  return (
    <MuiAvatar classes={{ root: classes.root }}>
      {path ? (
        <img
          src={normalizeUrl(path)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          alt="Avatar"
        />
      ) : fallback}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  path: PropTypes.string,
  fallback: PropTypes.node.isRequired
};

Avatar.defaultProps = {
  path: null
};

export default Avatar;
