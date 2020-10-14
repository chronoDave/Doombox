import { makeStyles } from '@material-ui/core';

export const useHiddenStyles = makeStyles(theme => ({
  smallDown: {
    [theme.breakpoints.down(theme.breakpoints.keys.small)]: {
      display: 'none'
    }
  }
}));
