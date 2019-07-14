import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const BackgroundProvider = ({ children, path }) => (
  <div
    style={{
      backgroundImage: `url(${path})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
  >
    {children}
  </div>
);

BackgroundProvider.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  path: state.profile.background.path || ''
});

export default connect(
  mapStateToProps
)(BackgroundProvider);
