import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: ({ delay }) => ({
    transition: theme.transitions.create(['opacity'], delay)
  }),
  invisible: {
    opacity: 0
  },
  hidden: {
    visibility: 'hidden'
  }
}), 'fade');
