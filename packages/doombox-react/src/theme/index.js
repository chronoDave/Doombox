import { createMuiTheme } from '@material-ui/core';

// Fonts
import RobotoRegular from '../../assets/fonts/Roboto-Regular.ttf';

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
  mixins: {
    player: {
      [breakpoints.up(breakpoints.keys.small)]: {
        width: 240
      },
      [breakpoints.up(breakpoints.keys.medium)]: {
        width: 300
      }
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(',')
  },
  breakpoints,
  palette: {
    type: variant,
    grey
  }
});
