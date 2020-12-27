import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: theme.spacing(1.5),
    alignItems: 'center'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(),
    flexGrow: 1
  }
}), 'labelToggle');
