import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  trackActive: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary,
    flexShrink: 0,
    outline: 0,
  },
  trackInactive: {
    width: '100%',
    height: '100%',
    outline: 0,
    backgroundColor: theme.palette.alpha(
      theme.palette.primary,
      theme.palette.opacity.inactive
    )
  },
  thumb: {
    position: 'relative',
    width: theme.mixins.slider.thumb,
    height: theme.mixins.slider.thumb,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: theme.palette.autoContrast(
      theme.palette.primary,
      theme.palette.grey[0],
      theme.palette.grey[6]
    ),
    outline: 0
  }
}), 'slider');
