import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  title: {
    minWidth: 0
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    transition: theme.transition.create(
      ['color', 'background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[3]
    }
  },
  buttonIndex: {
    marginRight: theme.spacing()
  },
  buttonActive: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.dark
    }
  },
  buttonMetadata: {
    display: 'flex',
    flexDirection: 'column'
  }
}), 'playlist');
