import { fade } from '@material-ui/core/styles';

export const AppStyles = theme => ({
  root: {
    position: 'fixed',
    top: theme.dimensions.appBar,
    width: '100%',
    height: `calc(100% - ${theme.dimensions.appBar}px)`,
    overflow: 'auto'
  },
  barRoot: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: theme.dimensions.appBar
  },
  draggable: {
    flexGrow: 1,
    '-webkit-app-region': 'drag'
  },
  button: {
    height: theme.dimensions.appBar,
    width: theme.dimensions.appBar * 1.25,
    transition: theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
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
    transition: theme.transitions.create(['background-color', 'color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main
    }
  }
});
