import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(),
    color: theme.palette.text.primary,
    transition: theme.transitions.create(['background-color'])
  },
  hover: {
    '&:hover': {
      backgroundColor: theme.palette.actions.hover
    }
  },
  disabled: {
    color: theme.palette.text.disabled
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    padding: theme.spacing(0.5)
  }
}), 'buttonIcon');
