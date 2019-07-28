import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { useTheme } from '@material-ui/core/styles';

// Utils
import { normalizeUrl } from '../../utils';

// Assets
import backgroundDefault from '../../assets/image/backgroundDefault.jpg';

const BackgroundProvider = props => {
  const {
    children,
    user
  } = props;
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundImage: (user && user.background && user.background.path) ?
          `url("${normalizeUrl(user.background.path)}")` :
          `url("${backgroundDefault}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
    >
      <div
        style={{
          backgroundPosition: 'fixed',
          backgroundImage: `linear-gradient(
            180deg,
            ${theme.palette.getAlpha(theme.palette.background.default, 0.33)},
            ${theme.palette.getAlpha(theme.palette.background.default, 0.66)}
          )`,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <div
          style={{
            height: '100%',
            overflow: 'auto'
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

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
