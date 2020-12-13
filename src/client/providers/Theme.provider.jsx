import React, { useState, useEffect } from 'react';
import { injectGlobal } from 'emotion';
import PropTypes from 'prop-types';

// Types
import { IPC } from '@doombox-utils/types';

// Actions
import { useIpc } from '../hooks';

// Context
import { ThemeContext } from '../context';

// Utils
import { createTheme } from '../theme';

// Assets
import NotoSansJPLight from '../assets/fonts/NotoSansJP-Light.otf';
import NotoSansJPRegular from '../assets/fonts/NotoSansJP-Regular.otf';
import NotoSansJPMedium from '../assets/fonts/NotoSansJP-Medium.otf';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(createTheme());

  useIpc(IPC.CHANNEL.THEME, null, payload => setTheme(createTheme(payload.data)));

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

  useEffect(() => {
    injectGlobal({
      '*::-webkit-scrollbar': {
        backgroundColor: theme.palette.grey[0],
        width: theme.spacing()
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[3]
      }
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ThemeProvider;
