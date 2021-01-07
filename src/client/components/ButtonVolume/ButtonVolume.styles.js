import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  popper: {
    backgroundColor: theme.palette.grey[1],
    padding: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
    height: 90,
    width: 28,
    alignItems: 'center'
  }
}), 'buttonVolume');
