import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: theme.spacing(2),
    maxWidth: theme.breakpoints.values.md
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(0.5)
  },
  description: {
    marginBottom: theme.spacing()
  },
  progress: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  file: {
    marginTop: theme.spacing(),
    height: 60
  },
  progressLabel: {
    marginLeft: theme.spacing()
  }
}), 'overlayScan');
