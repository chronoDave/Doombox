import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    WebkitAppRegion: 'drag'
  },
  menu: {
    display: 'flex'
  },
  menuButton: {
    minWidth: theme.spacing(5),
    padding: theme.spacing(0, 1),
    color: theme.palette.fade(
      theme.palette.text.primary,
      theme.palette.action.inactive
    ),
    transition: theme.transition.create(
      ['color', 'background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[2]
    }
  },
  menuButtonActive: {
    color: theme.palette.text.primary
  },
  menuButtonClose: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    minWidth: 0,
    flexGrow: 1,
    WebkitAppRegion: 'drag'
  },
  buttons: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end'
  }
}), 'appBar');
