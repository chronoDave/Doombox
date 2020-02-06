import React from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Utils
import { propPalette } from '../../utils/propTypes';

import { createTheme } from './theme';

const ThemeProvider = ({ palette, children }) => {
  const theme = createTheme({ palette });

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
  palette: propPalette
};

ThemeProvider.defaultProps = {
  palette: {}
};

const mapStateToProps = state => ({
  palette: state.config[TYPE.CONFIG.PALETTE]
});

export default connect(
  mapStateToProps
)(ThemeProvider);
