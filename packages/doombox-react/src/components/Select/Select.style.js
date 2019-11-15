import { makeStyles } from '@material-ui/core';

export const useSelectStyle = makeStyles(theme => ({
  menuItemRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  selectMenu: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1)
  }
}));
