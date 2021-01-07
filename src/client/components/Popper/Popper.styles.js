import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[2],
    boxShadow: theme.shadows[4]
  },
  arrow: {
    transform: 'rotate(45deg)',
    width: theme.spacing(),
    height: theme.spacing()
  }
}), 'popper');
