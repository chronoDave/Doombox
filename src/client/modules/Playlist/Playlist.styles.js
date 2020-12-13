import { makeStyles } from '../../theme';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5, 1),
    minWidth: 0,
    [theme.breakpoints.join(
      theme.breakpoints.create(
        theme.breakpoints.queries.minWidth,
        theme.breakpoints.values.sm
      ),
      theme.breakpoints.create(
        theme.breakpoints.queries.minHeight,
        theme.breakpoints.values.xs
      )
    )]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing()
    }
  },
  button: {
    padding: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[1],
    transition: theme.transition.create(
      ['color', 'background-color'],
      { duration: theme.transition.duration.shortest }
    ),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.grey[2]
    },
    [theme.breakpoints.create(
      theme.breakpoints.queries.minWidth,
      theme.breakpoints.values.sm
    )]: {
      paddingLeft: theme.spacing(1.5)
    }
  },
  buttonIndex: {
    minWidth: theme.spacing(4),
    marginRight: theme.spacing()
  },
  buttonActive: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.dark
    }
  },
  buttonMetadata: {
    display: 'flex',
    flexDirection: 'column'
  }
}), 'playlist');
