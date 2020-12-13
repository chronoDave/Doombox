import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: ({ duration }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 1,
    transition: theme.transition.create(['opacity'], { duration }),
    zIndex: theme.zIndex.overlay,
    backgroundColor: theme.palette.overlay(
      theme.palette.grey[0],
      theme.palette.opacity.overlay
    ),
    overflowY: 'auto'
  }),
  hidden: {
    opacity: 0
  },
  disabled: {
    visibility: 'hidden',
  }
}), 'overlay');
