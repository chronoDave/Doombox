import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: 0
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
  }
}), 'main');
