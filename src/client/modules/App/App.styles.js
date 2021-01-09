import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100vh',
    backgroundColor: theme.palette.dark ?
      theme.palette.grey[1] :
      theme.palette.grey[6]
  },
  window: {
    display: 'flex',
    backgroundColor: theme.palette.dark ?
      theme.palette.grey[0] :
      theme.palette.grey[6]
  },
  controls: {
    color: theme.palette.text.primary
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 0,
    position: 'relative'
  },
  controller: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.mixins.player.xs.width,
    [theme.breakpoints.create('minWidth', 'sm')]: {
      width: theme.mixins.player.sm.width,
    },
    [theme.breakpoints.create('minWidth', 'md')]: {
      width: theme.mixins.player.md.width
    }
  },
  library: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    backgroundColor: theme.palette.dark ?
      theme.palette.grey[1] :
      theme.palette.white,
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 0.5)
  }
}), 'app');
