import { createMuiTheme } from '@material-ui/core/styles';

// Core
import * as Spacing from './spacing';
import * as Colors from './colors';
import { border } from './border';

export const theme = createMuiTheme({
  overrides: {
    MuiListItemIcon: {
      root: {
        color: Colors.GREY[50]
      }
    },
    MuiListSubheader: {
      root: {
        color: Colors.GREY[200]
      }
    },
    MuiLink: {
      root: {
        color: Colors.SECONDARY.main
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: Colors.GREY[600]
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'rgba(255, 255, 255, 0.23)'
      }
    },
    MuiSelect: {
      icon: {
        color: Colors.GREY[50],
        marginRight: 8
      }
    }
  },
  palette: {
    primary: Colors.PRIMARY,
    secondary: Colors.SECONDARY,
    grey: Colors.GREY,
    text: {
      primary: Colors.GREY[50],
      secondary: Colors.GREY[300]
    },
    background: {
      default: Colors.GREY[400],
      paper: Colors.GREY[600]
    },
    error: Colors.ERROR,
    warning: Colors.WARNING,
    success: Colors.SUCCESS,
    info: Colors.INFO,
  },
  border,
  component: Spacing.COMPONENT
});
