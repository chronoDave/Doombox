import url from 'url';

// Core
import { createMuiTheme } from '@material-ui/core';

// Fonts
import RobotoRegular from '../assets/fonts/Roboto-Regular.ttf';

// Theme
import breakpoints from './breakpoints';

export const createTheme = ({
  variant,
  grey
}) => createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body': {
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        },
        '@font-face': [{
          fontFamily: 'Roboto',
          fontWeight: 400,
          src: `url(${RobotoRegular}) format('truetype')`
        }]
      }
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  },
  createBackgroundImage: (src, opacity = 0.42) => [
    `linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity}))`,
    `url("${url.pathToFileURL(src).href}")`
  ].join(','),
  breakpoints,
  palette: {
    type: variant,
    grey
  }
});
