import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ThemeContext } from '../context';
import { createTheme } from '../theme';

const ThemeProvider = ({ children, name }) => {
  const [theme, setTheme] = useState(createTheme());

  useEffect(() => {
    setTheme(createTheme(name));

    document.body.classList.toggle('dark', name !== 'light');
    document.body.classList.toggle('light', name !== 'dark');
  }, [name]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  name: state.config.display.theme
});

export default connect(
  mapStateToProps
)(ThemeProvider);
