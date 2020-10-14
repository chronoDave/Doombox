import { makeStyles } from '@material-ui/core';

export const useHiddenStyles = makeStyles(theme => ({
  smallDown: {
    [theme.breakpoints.down(theme.breakpoints.keys.small)]: {
      display: 'none'
    }
  },
  smallUp: {
    [theme.breakpoints.up(theme.breakpoints.keys.small)]: {
      display: 'none'
    }
  },
  mediumDown: {
    [theme.breakpoints.down(theme.breakpoints.keys.medium)]: {
      display: 'none'
    }
  },
  mediumUp: {
    [theme.breakpoints.up(theme.breakpoints.keys.medium)]: {
      display: 'none'
    }
  },
  largeDown: {
    [theme.breakpoints.down(theme.breakpoints.keys.large)]: {
      display: 'none'
    }
  },
  largeUp: {
    [theme.breakpoints.up(theme.breakpoints.keys.large)]: {
      display: 'none'
    }
  }
}));
