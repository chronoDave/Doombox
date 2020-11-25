import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    ...theme.typography.body,
    outline: 0,
    border: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    width: '100%',
    color: theme.palette.primary.contrastText
  }
}), 'search');
