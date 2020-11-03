import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: ({ duration = theme.transition.duration.shortest }) => ({
    opacity: 1,
    transition: theme.transition.create(['opacity'], { duration })
  }),
  hidden: {
    opacity: 0
  },
  unmount: {
    display: 'none !important'
  }
}), 'popper');
