import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(0.5),
    height: 80,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'xs'),
      theme.breakpoints.create('minHeight', 'xs')
    )]: {
      height: theme.mixins.player.xs.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      height: theme.mixins.player.sm.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'md'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      height: theme.mixins.player.md.height
    }
  },
  buttons: {
    color: theme.palette.grey[6]
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    color: theme.palette.grey[6]
  },
  duration: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  controls: {
    backgroundColor: 'red'
  }
}), 'player');
