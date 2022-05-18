import { makeStyles } from '../../../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: `${theme.mixins.albums.item.xs.padding}px 0`,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      padding: `${theme.mixins.albums.item.sm.padding}px 0`,
    },
  },
  button: {
    display: 'flex'
  },
  cover: {
    objectFit: 'contain',
    width: theme.mixins.albums.item.xs.height,
    height: theme.mixins.albums.item.xs.height,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      width: theme.mixins.albums.item.sm.height,
      height: theme.mixins.albums.item.sm.height,
    },
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'lg'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      width: theme.mixins.albums.item.lg.height,
      height: theme.mixins.albums.item.lg.height,
    }
  },
  label: {
    paddingLeft: theme.spacing(0.5),
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'sm'),
      theme.breakpoints.create('minHeight', 'sm')
    )]: {
      paddingLeft: theme.spacing(0.75),
      paddingTop: theme.spacing(0.5)
    },
  },
  details: {
    paddingTop: theme.spacing(0.5),
    [theme.breakpoints.join(
      theme.breakpoints.create('minWidth', 'lg'),
      theme.breakpoints.create('minHeight', 'md')
    )]: {
      paddingTop: theme.spacing()
    }
  }
}), 'virtualAlbumsItem');
