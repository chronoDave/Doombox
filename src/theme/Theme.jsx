import { createMuiTheme } from '@material-ui/core/styles';

import * as Colors from './Colors';
import * as Typography from './Typography';
import * as Spacing from './Spacing';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: Colors.DISCORD_PURPLE_PRIMARY,
      dark: Colors.DISCORD_PURPLE_DARK,
      contrastText: Colors.GREY['0']
    },
    secondary: {
      main: Colors.DISCORD_BLURPLE
    },
    text: {
      secondary: Colors.GREY['100']
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
    h1: Typography.H1(Colors.GREY['0']),
    h2: Typography.H2(Colors.GREY['0']),
    h3: Typography.H3(Colors.GREY['0']),
    h4: Typography.H4(Colors.GREY['0']),
    h5: Typography.H5(Colors.GREY['0']),
    h6: Typography.H6(Colors.GREY['0']),
    subtitle1: Typography.SUBTITLE_1(Colors.GREY['0']),
    subtitle2: Typography.SUBTITLE_2(Colors.GREY['0']),
    body1: Typography.BODY_1(Colors.GREY['0']),
    body2: Typography.BODY_2(Colors.GREY['0']),
    button: Typography.BUTTON(Colors.GREY['0']),
    caption: Typography.CAPTION(Colors.GREY['0']),
    overline: Typography.OVERLINE(Colors.GREY['0'])
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
      backgroundColor: Colors.GREY[600],
      borderStyle: 'solid',
      borderColor: Colors.GREY[300],
      borderRadius: 7,
      borderWidth: 3
    },
    '&::-webkit-scrollbar-track': {
      backgroundClip: 'padding-box',
      borderRadius: 7,
      borderStyle: 'solid',
      borderColor: Colors.GREY[300],
      borderWidth: 3,
      backgroundColor: Colors.GREY[400]
    }
  }
});

export default Theme;
