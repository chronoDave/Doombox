import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1.5),
    transition: theme.transitions.create(['background-color']),
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.text
    }
  },
  secondary: {
    marginLeft: theme.spacing(3)
  },
  divider: {
    borderBottom: theme.border(theme.palette.grey[3])
  }
}), 'menuItem');
