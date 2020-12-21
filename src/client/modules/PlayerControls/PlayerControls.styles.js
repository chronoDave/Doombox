import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(-0.5),
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'xs')
    )]: {
      marginBottom: 0
    }
  }
}), 'playerControls');
