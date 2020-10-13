import { createMuiTheme } from '@material-ui/core';

// Fonts
import RobotoRegular from '../../assets/fonts/Roboto-Regular.ttf';

const breakpointValues = {
  small: 480
};

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
  breakpoints: {
    values: breakpointValues,
    up: key => `@media (min-width:${breakpointValues[key]}px)`,
    down: key => `@media (max-width:${breakpointValues[key]}px)`
  },
  palette: {
    type: variant,
    grey
  }
});
