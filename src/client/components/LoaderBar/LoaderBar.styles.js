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
  track: ({ value = 0 }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary,
    width: `${value}%`
  })
}), 'loaderBar');
