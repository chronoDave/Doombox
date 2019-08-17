import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';

// Validation
import { propUser } from '../../validation/propTypes';

// Styles
import { useBackgroundStyle } from './Background.style';

const BackgroundImage = ({ children, user }) => {
  const classes = useBackgroundStyle({ user });

  return (
    <div className={clsx(classes.root, classes.image)}>
      {children}
    </div>
  );
};

BackgroundImage.propTypes = {
  children: PropTypes.node,
  user: propUser
};

BackgroundImage.defaultProps = {
  children: null,
  user: null
};

const mapStateToProps = state => ({
  user: state.profile.user
});

export default connect(
  mapStateToProps
)(BackgroundImage);
