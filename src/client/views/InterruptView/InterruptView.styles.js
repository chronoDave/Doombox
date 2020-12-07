import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: theme.spacing(2)
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing()
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  progressLabel: {
    marginLeft: theme.spacing()
  }
}), 'interrupt');
