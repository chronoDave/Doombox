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
    flexGrow: 1
  },
  titleTypography: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
      height: theme.component.appBar,
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, 0px)'
    }
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
