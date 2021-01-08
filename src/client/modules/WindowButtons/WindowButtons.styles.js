import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: theme.spacing(5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.disabled,
    transition: theme.transitions.create(['color', 'background-color']),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.actions.hover
    }
  },
  close: {
    '&:hover': {
      backgroundColor: theme.palette.error,
    }
  }
}), 'windowButtons');
