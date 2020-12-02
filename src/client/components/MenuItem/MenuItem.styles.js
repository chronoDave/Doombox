import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1.5),
    transition: theme.transition.create(
      ['background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    }
  },
  secondary: {
    marginLeft: theme.spacing(3)
  },
  divider: {
    borderBottom: theme.border(theme.palette.grey[50])
  }
}), 'menuItem');
