import React, { useState, useEffect } from 'react';
import { css, injectGlobal } from 'emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Context
import { ThemeContext } from '../context';

// Utils
import { createTheme } from '../theme';

const ThemeProvider = ({ children, name }) => {
  const [theme, setTheme] = useState(createTheme());

  useEffect(() => {
    setTheme(createTheme(name));

    document.body.classList.toggle('dark', name !== 'light');
    document.body.classList.toggle('light', name !== 'dark');
  }, [name]);

  useEffect(() => {
    injectGlobal({
      body: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        margin: 0
      }
    });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div
        className={css({
          '& *': {
            '*::-webkit-scrollbar': {
              backgroundColor: theme.palette.dark ?
                theme.palette.grey[2] :
                theme.palette.grey[5],
              width: theme.spacing()
            },
            '*::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.dark ?
                theme.palette.grey[3] :
                theme.palette.grey[6]
            }
          },
          label: 'cssBaseline'
        })}
      >
        {children}
      </div>
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
