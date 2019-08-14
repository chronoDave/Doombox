import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';

// Styles
import { useBackgroundStyle } from './Background.style';

const Background = ({ children, user }) => {
  const classes = useBackgroundStyle(user);

  return (
    <Fragment>
      <div className={clsx(classes.root, classes.image)}>
        <div className={clsx(classes.root, classes.fade)} />
      </div>
      {children}
    </Fragment>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.profile.user
});

export default connect(
  mapStateToProps
)(Background);
