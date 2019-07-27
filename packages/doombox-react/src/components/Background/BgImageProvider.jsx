import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Utils
import { normalizeUrl } from '../../utils';

// Assets
import backgroundDefault from '../../assets/image/backgroundDefault.jpg';

const BgImageProvider = ({
  children,
  user,
  background,
  fullHeight
}) => (
  <div
    style={{
      backgroundImage: (user && user.background && user.background.path) ?
        `url("${normalizeUrl(user.background.path)}")` :
        `url("${normalizeUrl(background)}")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: fullHeight ? '100vh' : 'initial'
    }}
  >
    {children}
  </div>
);

BgImageProvider.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.object.isRequired,
  background: PropTypes.string,
  fullHeight: PropTypes.bool
};

BgImageProvider.defaultProps = {
  background: backgroundDefault,
  fullHeight: false
};

const mapStateToProps = state => ({
  user: state.profile.user
});

export default connect(
  mapStateToProps
)(BgImageProvider);
