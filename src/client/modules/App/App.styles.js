import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100vh',
    backgroundColor: theme.palette.grey[0]
  },
  window: {
    display: 'flex'
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
    backgroundColor: theme.palette.grey[1],
    flexGrow: 1
  }
}), 'app');
