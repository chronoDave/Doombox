import { makeStyles } from '@material-ui/core';

export const useHiddenStyles = makeStyles(theme => ({
  smallDown: {
    [theme.breakpoints.down('small')]: {
      display: 'none'
    }
  }
}));
