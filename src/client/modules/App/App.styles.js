import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100vh',
    backgroundColor: theme.palette.grey[0]
  },
  body: {
    display: 'flex',
    flexGrow: 1,
    minHeight: 0,
    position: 'relative'
  },
  player: {
    display: 'flex',
    flexDirection: 'column',
    width: theme.mixins.player.xs.width,
    [theme.breakpoints.create(
      theme.breakpoints.queries.minWidth,
      theme.breakpoints.values.sm
    )]: {
      width: theme.mixins.player.sm.width,
    },
    [theme.breakpoints.create(
      theme.breakpoints.queries.minWidth,
      theme.breakpoints.values.md
    )]: {
      width: theme.mixins.player.md.width
    }
  },
  playlist: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    flexGrow: 1
  },
  library: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    backgroundColor: theme.palette.grey[1],
    flexGrow: 1
  }
}), 'app');
