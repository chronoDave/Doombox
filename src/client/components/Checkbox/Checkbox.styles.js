import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    margin: 0,
    marginRight: theme.spacing()
  }
}), 'checkbox');
