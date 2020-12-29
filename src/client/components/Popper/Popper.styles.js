import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    opacity: 1,
    transition: theme.transitions.create(['opacity'])
  },
  hidden: {
    opacity: 0
  },
  disabled: {
    visibility: 'hidden',
  }
}), 'popper');
