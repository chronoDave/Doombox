import { createMuiTheme } from '@material-ui/core/styles';

import * as Colors from './Colors';
import * as Typography from './Typography';
import * as Spacing from './Spacing';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.DEFAULT_PRIMARY_MAIN,
      dark: Colors.DEFAULT_PRIMARY_DARK,
      light: Colors.DEFAULT_PRIMARY_LIGHT
    },
    text: {
      primary: Colors.GREY[50],
      secondary: Colors.GREY[100]
    },
    grey: Colors.GREY,
    getAlpha: (hex, alpha) => {
      const composite = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      if (composite) {
        const r = parseInt(composite[1], 16);
        const g = parseInt(composite[2], 16);
        const b = parseInt(composite[3], 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }

      return null;
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: Typography.FONT_FAMILY,
    h1: Typography.H1(Colors.GREY[50]),
    h2: Typography.H2(Colors.GREY[50]),
    h3: Typography.H3(Colors.GREY[50]),
    h4: Typography.H4(Colors.GREY[50]),
    h5: Typography.H5(Colors.GREY[50]),
    h6: Typography.H6(Colors.GREY[50]),
    subtitle1: Typography.SUBTITLE_1(Colors.GREY[50]),
    subtitle2: Typography.SUBTITLE_2(Colors.GREY[50]),
    body1: Typography.BODY_1(Colors.GREY[50]),
    body2: Typography.BODY_2(Colors.GREY[50]),
    button: Typography.BUTTON(Colors.GREY[50]),
    caption: Typography.CAPTION(Colors.GREY[50]),
    overline: Typography.OVERLINE(Colors.GREY[50])
  },
  spacing: {
    unit: 8,
    component: Spacing.COMPONENT
  },
  scrollbar: {
    '&::-webkit-scrollbar': {
      width: 14,
      height: 14
    },
    '&::-webkit-scrollbar-corner': {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: Colors.GREY[300],
      border: `4px solid ${Colors.GREY[400]}`
    },
    '&::-webkit-scrollbar-track': {
      backgroundClip: 'padding-box',
      backgroundColor: Colors.GREY[400]
    }
  }
});

export default Theme;
