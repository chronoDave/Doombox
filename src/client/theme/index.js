import url from 'url';

// Core
import { createMuiTheme } from '@material-ui/core';

// Fonts
import NotoSansJPRegular from '../assets/fonts/NotoSansJP-Regular.otf';
import NotoSansJPMedium from '../assets/fonts/NotoSansJP-Medium.otf';

export const createTheme = ({
  variant,
  grey
}) => createMuiTheme({
  props: {
    MuiFade: {
      timeout: 150 // theme.transitions.duration.shortest
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body': {
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        },
        '@font-face': [{
          fontFamily: 'MPlus',
          fontWeight: 400,
          src: `url(${NotoSansJPRegular}) format('truetype')`
        }, {
          fontFamily: 'MPlus',
          fontWeight: 500,
          src: `url(${NotoSansJPMedium}) format('truetype')`
        }],
      }
    }
  },
  typography: {
    fontFamily: ['MPlus', 'sans-serif'].join(','),
    body1: {
      letterSpacing: `${1 / 32}rem`
    },
    body2: {
      letterSpacing: `${1 / 32}rem`
    }
  },
  createBackgroundImage: (src, opacity = 0.42) => [
    `linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,${opacity}))`,
    `url("${url.pathToFileURL(src).href}")`
  ].join(','),
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 720,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    type: variant,
    grey
  }
});
