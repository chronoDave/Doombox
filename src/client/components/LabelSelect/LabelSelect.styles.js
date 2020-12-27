import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1.5)
  },
  label: {
    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5)
  }
}), 'labelSelect');
