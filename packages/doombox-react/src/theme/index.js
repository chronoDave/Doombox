import { createMuiTheme } from '@material-ui/core/styles';

// Fonts
import RobotoRegular from '../../assets/fonts/Roboto-Regular.ttf';

export const createTheme = ({
  variant,
  grey
} = {}) => createMuiTheme({
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
      sm: 420
    }
  },
  palette: {
    type: variant,
    grey
  },
  component: {
    appBar: 30
  }
});
