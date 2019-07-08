import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar as MuiAvatar
} from '@material-ui/core';

// Style
import AvatarStyle from './AvatarStyle';

const Avatar = props => {
  const { classes, path, fallback } = props;

  return (
    <MuiAvatar classes={{ root: classes.root }}>
      {path ? (
        <img
          src={`file:${path}`}
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
  classes: PropTypes.object.isRequired,
  path: PropTypes.string,
  fallback: PropTypes.node.isRequired
};

Avatar.defaultProps = {
  path: null
};

export default withStyles(
  AvatarStyle
)(Avatar);
