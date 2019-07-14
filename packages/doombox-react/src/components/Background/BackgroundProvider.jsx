import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Utils
import { normalizeUrl } from '../../utils';

const BackgroundProvider = ({ children, user }) => (
  <div
    style={{
      backgroundImage: (user && user.background && user.background.path) ?
        `url("${normalizeUrl(user.background.path)}")` :
        null,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}
  >
    {children}
  </div>
);

BackgroundProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.profile.user
});

export default connect(
  mapStateToProps
)(BackgroundProvider);
