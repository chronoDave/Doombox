import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.up('nd')]: {
      justifyContent: 'center'
    }
  }
}), 'playerControls');
