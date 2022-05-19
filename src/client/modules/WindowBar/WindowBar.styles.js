import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.dark ?
      theme.palette.grey[0] :
      theme.palette.grey[6]
  }
}));
