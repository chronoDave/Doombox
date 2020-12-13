import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[1],
    boxShadow: theme.shadows[4],
    zIndex: theme.zIndex.menu
  }
}), 'menu');
