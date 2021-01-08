import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 1.5),
    transition: theme.transitions.create(['background-color', 'color']),
    color: theme.palette.text.primary,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.primary,
      color: theme.palette.autoContrast(
        theme.palette.primary,
        theme.palette.grey[6],
        theme.palette.grey[0]
      )
    }
  },
  secondary: {
    marginLeft: theme.spacing(3),
    color: 'inherit'
  },
  divider: {
    borderBottom: theme.border(
      theme.palette.dark ?
        theme.palette.grey[2] :
        theme.palette.grey[4]
    )
  }
}), 'menuItem');
