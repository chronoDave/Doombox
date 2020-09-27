import { makeStyles } from '@material-ui/core';

export const useAppBarStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: theme.component.appBar,
    backgroundColor: theme.palette.grey[50]
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    width: theme.component.appBar,
    height: theme.component.appBar
  },
  titleRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    minWidth: 0,
    flexGrow: 1
  },
  buttonIcon: {
    width: theme.spacing(5),
  },
  buttonIconClose: {
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.palette.error.main,
    }
  },
  menuItem: {
    padding: theme.spacing(0, 1),
    ...theme.typography.body2
  },
  drag: {
    '-webkit-app-region': 'drag'
  }
}));
