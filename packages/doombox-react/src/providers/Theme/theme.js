// Core
import {
  createMuiTheme,
  darken,
  lighten
} from '@material-ui/core/styles';

export const createTheme = props => {
  const {
    darkTheme,
    grey,
    ramp,
    ...rest
  } = props;

  const generateGrey = () => Object.keys(ramp)
    .map(key => {
      const value = ramp[key];
      return ({
        [key]: darkTheme ? lighten(grey.dark, value) : darken(grey.light, value)
      });
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const greys = generateGrey();

  return createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      grey: greys,
      background: {
        paper: greys[50],
        default: greys[100]
      },
      ...rest
    },
    dimensions: {
      scrollbar: 8,
      appBar: 32,
      sidebar: {
        tab: 64,
        panel: {
          xs: 192,
          md: 256
        }
      },
      label: {
        divider: 48,
        item: 160
      }
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 740,
        md: 960,
        lg: 1280,
        xl: 1920
      }
    },
    isDarkTheme: darkTheme,
    border: (color, width = '1px', style = 'solid') => `${width} ${style} ${color}`
  });
};
