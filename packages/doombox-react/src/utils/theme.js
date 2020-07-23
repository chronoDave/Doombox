// Core
import {
  createMuiTheme,
  darken,
  lighten
} from '@material-ui/core/styles';

export const createTheme = theme => {
  const {
    variant,
    grey: {
      light,
      dark
    },
    ramp
  } = theme;

  const grey = Object.entries(ramp)
    .reduce((acc, [key, value]) => ({
      ...acc,
      [key]: variant === 'dark' ?
        darken(light, value) :
        lighten(dark, value)
    }), {});

  return createMuiTheme({
    palette: {
      type: variant,
      grey,
      text: {
        primary: variant === 'dark' ? light : dark
      }
    },
    component: {
      appBar: 30
    }
  });
};
