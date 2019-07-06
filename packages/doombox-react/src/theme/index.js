import { createMuiTheme } from '@material-ui/core/styles';

// Core
import { spacing } from './spacing';

export const theme = createMuiTheme({
  palette: {
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
  component: { ...spacing }
});
