import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5, 1),
    minWidth: 0
  },
  button: {
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[3],
    transition: theme.transition.create(
      ['color', 'background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.text,
      backgroundColor: theme.palette.grey[5]
    }
  },
  buttonAlt: {
    backgroundColor: theme.palette.grey[4],
  },
  buttonIndex: {
    marginRight: theme.spacing()
  },
  buttonActive: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text,
      backgroundColor: theme.palette.primary.dark
    }
  },
  buttonMetadata: {
    display: 'flex',
    flexDirection: 'column'
  }
}), 'playlist');
