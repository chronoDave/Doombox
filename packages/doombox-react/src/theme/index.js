import { createMuiTheme } from '@material-ui/core/styles';

// Core
import { SPACING } from './spacing';
import * as Colors from './colors';

export const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'rgba(255, 255, 255, 0.23)'
      }
    }
  },
  palette: {
    primary: Colors.PRIMARY,
    grey: Colors.GREY,
    text: {
      primary: Colors.GREY[50],
      secondary: Colors.GREY[200]
    },
    background: {
      default: Colors.GREY[400],
      paper: Colors.GREY[500]
    },
    error: Colors.ERROR,
    warning: Colors.WARNING,
    success: Colors.SUCCESS,
    info: Colors.INFO,
    getAlpha: (hex, alpha) => {
      const composite = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      if (composite) {
        const r = parseInt(composite[1], 16);
        const g = parseInt(composite[2], 16);
        const b = parseInt(composite[3], 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      // Return hex if invalid
      return hex;
    },
  },
  component: { ...SPACING }
});
