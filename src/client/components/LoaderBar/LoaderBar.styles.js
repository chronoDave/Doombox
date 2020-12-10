import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    height: 4,
    backgroundColor: theme.palette.overlay(
      theme.palette.primary.main,
      theme.palette.opacity.hover
    ),
    width: '100%'
  },
  track: ({ value = 0 }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    width: `${value}%`
  })
}), 'linearProgress');
