import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(theme => ({
  root: {
    top: theme.component.appBar,
    position: 'fixed',
    width: '100vw',
    height: `calc(100vh - ${theme.component.appBar}px)`
  },
  drag: {
    '-webkit-app-region': 'drag'
  },
  barRoot: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: theme.component.appBar,
    backgroundColor: theme.palette.grey[50]
  },
  barIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    width: theme.component.appBar,
    height: theme.component.appBar
  },
  barTitle: {
    flexGrow: 1,
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
  barButtonText: {
    padding: theme.spacing(0, 1),
    ...theme.typography.body2
  },
  barButtonIcon: {
    width: theme.spacing(5),
  },
  barButtonClose: {
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.palette.error.main,
    }
  }
}));
