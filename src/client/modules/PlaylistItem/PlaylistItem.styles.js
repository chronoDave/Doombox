import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[1],
    transition: theme.transitions.create(
      ['color', 'background-color'],
      { duration: 'shortest' }
    ),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[2]
    },
    [theme.breakpoints.create('minWidth', 'sm')]: {
      paddingLeft: theme.spacing(1.5)
    }
  },
  active: {
    color: theme.palette.primary.text,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.dark
    }
  },
  index: {
    minWidth: theme.spacing(4),
    marginRight: theme.spacing()
  },
  metadata: {
    display: 'flex',
    flexDirection: 'column'
  }
}), 'playlistItem');
