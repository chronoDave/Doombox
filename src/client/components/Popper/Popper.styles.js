import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: ({ duration }) => ({
    opacity: 1,
    transition: theme.transition.create(['opacity'], { duration })
  }),
  hidden: {
    opacity: 0
  },
  disabled: {
    visibility: 'hidden',
  }
}), 'popper');
