import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    height: 4,
    backgroundColor: theme.palette.fade(theme.palette.primary.main, 0.3),
    width: '100%'
  },
  track: ({ value = 0 }) => ({
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    width: `${value}%`
  })
}), 'linearProgress');
