import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    height: theme.spacing(0.5),
    backgroundColor: theme.palette.alpha(
      theme.palette.primary,
      theme.palette.opacity.inactive
    ),
    width: '100%'
  },
  track: {
    height: '100%',
    backgroundColor: theme.palette.primary
  }
}), 'loaderBar');
