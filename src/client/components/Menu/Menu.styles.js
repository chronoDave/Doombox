import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[2],
    boxShadow: theme.shadows[4]
  }
}), 'menu');
