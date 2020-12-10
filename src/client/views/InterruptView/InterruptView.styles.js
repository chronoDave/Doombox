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
  time: {
    marginTop: theme.spacing()
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  description: {
    marginTop: theme.spacing(),
    height: 60
  },
  progressLabel: {
    marginLeft: theme.spacing()
  }
}), 'interrupt');
