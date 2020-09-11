import { fade, makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(theme => ({
  root: {
    top: theme.component.appBar,
    position: 'fixed',
    width: '100vw',
    height: `calc(100vh - ${theme.component.appBar}px)`
  },
  body: {
    width: '100%',
    height: '100%',
    overflow: 'auto'
  },
  barRoot: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: theme.component.appBar
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
      justifyContent: 'center',
      paddingLeft: theme.spacing(15) - theme.component.appBar
    }
  },
  button: {
    width: theme.spacing(5),
    '&:hover': {
      backgroundColor: fade(
        theme.palette.type === 'dark' ? '#fff' : '#000',
        theme.palette.action.hoverOpacity
      )
    }
  },
  buttonClose: {
    '&:hover': {
      color: '#fff',
      backgroundColor: theme.palette.error.main,
    }
  },
  drag: {
    '-webkit-app-region': 'drag'
  }
}));
