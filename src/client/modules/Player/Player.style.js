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
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.xs
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.xs
      )
    )]: {
      height: theme.mixins.player.xs.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.sm
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.sm
      )
    )]: {
      height: theme.mixins.player.sm.height
    },
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.md
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.md
      )
    )]: {
      height: theme.mixins.player.md.height
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
