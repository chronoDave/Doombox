import { createMuiTheme } from '@material-ui/core';

// Fonts
import RobotoRegular from '../../assets/fonts/Roboto-Regular.ttf';

export const createTheme = ({
  variant,
  grey
}) => createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
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
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    type: variant,
    grey
  },
  component: {
    appBar: 30,
    player: {
      xs: 150,
      md: 240,
      lg: 300
    }
  }
});
