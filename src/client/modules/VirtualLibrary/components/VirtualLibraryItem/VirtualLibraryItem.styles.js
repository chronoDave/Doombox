import { makeStyles } from '../../../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.mixins.library.header.xs.padding}px`,
    height: theme.mixins.library.header.xs.height,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      padding: `0 ${theme.mixins.library.header.sm.padding}px`,
      height: theme.mixins.library.header.sm.height,
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'lg'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      padding: `0 ${theme.mixins.library.header.lg.padding}px`,
      height: theme.mixins.library.header.lg.height,
    }
  },
  headerButton: {
    display: 'flex',
    flexDirection: 'column'
  },
  headerDivider: {
    flexGrow: 1,
    height: 1,
    marginLeft: theme.spacing(0.75),
    backgroundColor: theme.palette.grey[2]
  },
  albumContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: `0 ${theme.mixins.library.body.xs.padding}px`,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      padding: `0 ${theme.mixins.library.body.sm.padding}px`,
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'lg'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      padding: `0 ${theme.mixins.library.body.lg.padding}px`,
    }
  },
  album: {
    display: 'flex',
    ...theme.mixins.library.item.xs,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: theme.mixins.library.item.sm,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'lg'),
      theme.breakpoints.create('minHeight', 'md')
    )]: theme.mixins.library.item.lg
  },
  albumButton: {
    display: 'flex'
  },
  cover: {
    objectFit: 'contain',
    width: theme.mixins.library.item.xs.width,
    height: theme.mixins.library.item.xs.height,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      width: theme.mixins.library.item.sm.width,
      height: theme.mixins.library.item.sm.height,
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'lg'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      width: theme.mixins.library.item.lg.height,
      height: theme.mixins.library.item.lg.height,
    }
  },
  metadata: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: theme.spacing(0.5, 1)
  },
  table: {
    marginTop: theme.spacing()
  }
}), 'virtualLibraryItem');
