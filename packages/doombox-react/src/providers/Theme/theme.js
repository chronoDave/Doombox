// Core
import { createMuiTheme } from '@material-ui/core/styles';

import * as Colors from './colors';

export const createTheme = ({
  colors: {
    darkMode,
    primary,
    secondary,
    grey,
    error,
    warning,
    success,
    info
  }
}) => createMuiTheme({
  palette: {
    type: darkMode ? 'dark' : 'light',
    primary: primary || Colors.PRIMARY,
    secondary: secondary || Colors.SECONDARY,
    grey: grey || Colors.GREY,
    error: error || Colors.ERROR,
    warning: warning || Colors.WARNING,
    success: success || Colors.SUCCESS,
    info: info || Colors.INFO
  },
  dimensions: {
    appBar: 32,
    sidebar: 256
  }
});
