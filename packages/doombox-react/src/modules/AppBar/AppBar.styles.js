import { makeStyles } from '@material-ui/core';

export const useAppBarStyles = makeStyles(theme => ({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0
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
