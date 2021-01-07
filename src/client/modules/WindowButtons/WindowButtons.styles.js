import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end'
  },
  button: {
    minWidth: theme.spacing(5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.disabled,
    transition: theme.transitions.create(['color', 'background-color']),
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[1]
    }
  },
  close: {
    '&:hover': {
      backgroundColor: theme.palette.error.main,
    }
  }
}), 'windowButtons');
