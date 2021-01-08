import React, { useState, useEffect } from 'react';
import { css, injectGlobal } from 'emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Context
import { ThemeContext } from '../context';

// Utils
import { createTheme } from '../theme';

// Assets
import NotoSansJPLight from '../assets/fonts/NotoSansJP-Light.otf';
import NotoSansJPRegular from '../assets/fonts/NotoSansJP-Regular.otf';
import NotoSansJPMedium from '../assets/fonts/NotoSansJP-Medium.otf';

const ThemeProvider = ({ children, themeName }) => {
  const [theme, setTheme] = useState(createTheme());

  useEffect(() => {
    setTheme(createTheme(themeName));
  }, [themeName]);

  useEffect(() => {
    [
      { src: NotoSansJPLight, weight: 300 },
      { src: NotoSansJPRegular, weight: 400 },
      { src: NotoSansJPMedium, weight: 500 }
    ].map(fontFace => injectGlobal({
      '@font-face': {
        fontFamily: 'NotoSansJP',
        src: `url(${fontFace.src}) format('truetype')`,
        fontWeight: fontFace.weight
      }
    }));

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
  themeName: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  themeName: state.config.display.theme
});

export default connect(
  mapStateToProps
)(ThemeProvider);
