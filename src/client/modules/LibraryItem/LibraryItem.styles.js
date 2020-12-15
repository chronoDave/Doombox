import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 0.5),
    height: theme.mixins.library.header,
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.lg
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.md
      )
    )]: {
      paddingLeft: theme.spacing(0.75)
    },
  },
  albums: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    display: 'flex',
    alignItems: 'flex-start',
    width: theme.mixins.library.item.xs,
    height: theme.mixins.library.item.xs,
    transition: theme.transition.create(
      ['background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      backgroundColor: theme.palette.grey[2]
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
      width: theme.mixins.library.item.sm,
      height: theme.mixins.library.item.sm,
    },
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.lg
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.md
      )
    )]: {
      width: theme.mixins.library.item.lg
    },
  },
  metadata: {
    padding: theme.spacing(0.5, 1),
    width: '100%',
  },
  table: {
    marginTop: theme.spacing(1)
  },
  cover: {
    objectFit: 'contain',
    width: theme.mixins.library.item.xs,
    height: theme.mixins.library.item.xs,
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
      width: theme.mixins.library.item.sm,
      height: theme.mixins.library.item.sm,
    },
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.lg
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.md
      )
    )]: {
      paddingLeft: 4,
      width: theme.mixins.library.item.sm - 4,
      height: theme.mixins.library.item.sm - 4,
    },
  }
}), 'libraryItem');
