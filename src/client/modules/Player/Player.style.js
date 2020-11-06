import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  cover: ({ cover = {} }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: cover.file && theme.createImage(cover.file),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(0.5),
    height: 90,
    width: 135,
    // 'xs'
    [theme.breakpoints.create(
      theme.breakpoints.directions.up,
      theme.breakpoints.values.xs,
      theme.breakpoints.axises.y
    )]: {
      height: 135
    },
    // 'sm'
    [theme.breakpoints.create(
      theme.breakpoints.directions.up,
      theme.breakpoints.values.sm
    )]: {
      width: 210
    },
    [theme.breakpoints.create(
      theme.breakpoints.directions.up,
      theme.breakpoints.values.sm,
      theme.breakpoints.axises.y
    )]: {
      height: 210
    },
    // 'md'
    [theme.breakpoints.create(
      theme.breakpoints.directions.up,
      theme.breakpoints.values.md
    )]: {
      width: 300
    },
    [theme.breakpoints.create(
      theme.breakpoints.directions.up,
      theme.breakpoints.values.md,
      theme.breakpoints.axises.y
    )]: {
      height: 300
    }
  }),
  coverTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  duration: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}), 'player');
