import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { Avatar as MuiAvatar } from '@material-ui/core';

// Validation
import { propImage } from '../../validation/propTypes';

// Styles
import { useAvatarStyle } from './Avatar.style';

const Avatar = ({ src, size, avatar }) => {
  const classes = useAvatarStyle();
  const getSource = () => {
    if (src) return src;
    if (avatar && avatar.path) return `file://${avatar.path}`;
    return null;
  };

  return (
    <MuiAvatar
      src={getSource()}
      classes={{ root: classes.root }}
      className={classes[size]}
    >
      {getSource() ? null : <IconPerson fontSize={size} />}
    </MuiAvatar>
  );
};

Avatar.propTypes = {
  avatar: propImage,
  src: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Avatar.defaultProps = {
  avatar: null,
  src: null,
  size: 'small'
};

const mapStateToProps = state => ({
  avatar: state.profile.user.avatar
});

export default connect(
  mapStateToProps
)(Avatar);
