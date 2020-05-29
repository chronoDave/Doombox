import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// Utils
import { createTheme } from '../theme';

// Validation
import { propTheme } from '../validation/propTypes';

const ThemeProvider = ({ children, theme }) => {
  if (!theme) return null;
  return (
    <MuiThemeProvider theme={createTheme(theme)}>
      {children}
    </MuiThemeProvider>
  );
};

const mapStateToProps = state => ({
  theme: state.ipc.theme
});

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: propTheme
};

ThemeProvider.defaultProps = {
  theme: null
};

export default connect(
  mapStateToProps
)(ThemeProvider);
