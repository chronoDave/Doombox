import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  search: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    backgroundColor: theme.palette.grey[0],
  },
}), 'libraryBar');
