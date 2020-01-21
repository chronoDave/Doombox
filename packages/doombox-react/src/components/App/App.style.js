import {
  makeStyles,
  fade
} from '@material-ui/core/styles';

export const useAppStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.dimensions.appBar,
    width: '100%',
    height: `calc(100% - ${theme.dimensions.appBar}px)`,
    overflow: 'auto',
  },
  barRoot: {
    zIndex: 2000,
    display: 'flex',
    width: '100%',
    height: theme.dimensions.appBar,
    backgroundColor: theme.palette.grey[100],
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.shortest,
    })
  },
  barTitle: {
    padding: theme.spacing(0, 1),
    minWidth: 0,
    margin: 4,
    flexGrow: 1,
  },
  draggable: {
    '-webkit-app-region': 'drag',
  },
  button: {
    height: theme.dimensions.appBar,
    width: theme.dimensions.appBar * 1.25,
    '&:hover': {
      backgroundColor: fade(
        theme.palette.action.active,
        theme.palette.action.hoverOpacity
      )
    }
  },
  buttonClose: {
    height: theme.dimensions.appBar,
    width: theme.dimensions.appBar * 1.25,
    '&:hover': {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main
    }
  }
}));
