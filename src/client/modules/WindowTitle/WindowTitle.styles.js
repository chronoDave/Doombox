import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    minWidth: 0,
    flexGrow: 1,
    WebkitAppRegion: 'drag'
  }
}), 'windowTitle');
