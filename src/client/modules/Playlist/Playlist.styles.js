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
    padding: theme.spacing(),
    paddingBottom: theme.spacing(0.5),
    paddingTop: 0,
    minWidth: 0
  },
  button: {
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[1],
    transition: theme.transition.create(
      ['color', 'background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[2]
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
