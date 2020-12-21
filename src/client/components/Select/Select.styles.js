import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
    paddingLeft: theme.spacing(1.5),
    borderRadius: 4,
    border: theme.border(theme.palette.text.disabled),
    color: theme.palette.text.primary,
    transition: theme.transitions.create(
      ['border-color'],
      { duration: 'shortest' }
    ),
    '&:hover': {
      borderColor: theme.palette.text.primary
    }
  },
  label: {
    flexGrow: 1
  },
  icon: {
    marginLeft: theme.spacing()
  }
}), 'select');
