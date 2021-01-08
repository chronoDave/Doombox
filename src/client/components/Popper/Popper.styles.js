import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.dark ?
      theme.palette.grey[1] :
      theme.palette.grey[6],
    boxShadow: theme.shadows[3]
  },
  arrow: {
    transform: 'rotate(45deg)',
    width: theme.spacing(),
    height: theme.spacing()
  }
}), 'popper');
