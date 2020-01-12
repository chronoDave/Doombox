// Core
import { createMuiTheme } from '@material-ui/core/styles';

export const createTheme = ({
  palette: {
    darkTheme,
    grey,
    ...restColors
  }
}) => {
  const themedGrey = () => {
    if (!darkTheme) return grey;
    return Object.keys(grey)
      .reverse()
      .reduce((acc, cur, index) => ({
        ...acc,
        [cur]: Object.values(grey)[index]
      }), {});
  };

  return createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      grey: themedGrey(),
      background: {
        paper: themedGrey()[0],
        default: themedGrey()[50]
      },
      ...restColors
    },
    dimensions: {
      appBar: 32,
      sidebar: {
        tab: 64,
        panel: 192
      }
    },
    createBorder: (color, width = '1px', style = 'solid') => `${width} ${style} ${color}`
  });
};
