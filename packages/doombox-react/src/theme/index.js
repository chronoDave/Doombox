import {
  createMuiTheme,
  darken,
  lighten
} from '@material-ui/core/styles';

// Fonts
import RobotoRegular from '../../assets/fonts/Roboto-Regular.ttf'

const defaultRamp = {
  50: 0,
  100: 0.02,
  200: 0.06,
  300: 0.11,
  400: 0.23,
  500: 0.45,
  600: 0.51,
  700: 0.59,
  800: 0.72,
  900: 0.87
};

export const createTheme = ({
  variant,
  breakpoints,
  grey: {
    light,
    dark
  },
  ramp
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
  breakpoints,
  palette: {
    type: variant,
    grey: Object.entries({
      ...defaultRamp,
      ...ramp
    })
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: variant === 'dark' ?
          darken(light, value) :
          lighten(dark, value)
      }), {}),
    text: {
      primary: variant === 'dark' ?
        light :
        dark
    }
  },
  component: {
    appBar: 30
  }
});
