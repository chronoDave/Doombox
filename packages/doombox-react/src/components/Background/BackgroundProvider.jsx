import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import path from 'path';

// Core
import { useTheme } from '@material-ui/core/styles';

// Utils
import { normalizeUrl } from '../../utils';

const BackgroundProvider = props => {
  const {
    children,
    user
  } = props;
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundImage: `url("${path.normalize(normalizeUrl(
          (user && user.background && user.background.path) ?
            user.background.path :
            `${__dirname}/static/images/backgroundDefault.png`
        ))}")`,
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
